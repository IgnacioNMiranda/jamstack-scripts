import { existsSync, mkdirSync, writeFile } from 'node:fs'
import { join } from 'node:path'
import { select } from '@inquirer/prompts'
import { deepReadDir } from './utils'

const bootstrap = async () => {
  const basePath = join(__dirname, '/scripts/')

  const scriptPaths: string[] = (await deepReadDir(basePath)).flat(Number.POSITIVE_INFINITY)
  const sanitizedScripts = scriptPaths.map(script => script.replace(basePath, ''))
  const services = new Set(sanitizedScripts.map(script => script.split('/')[0]))

  const service = await select({
    message: 'Select the service you want to use',
    choices: [...services].map(service => ({ name: service, value: service })),
  })

  const availableScripts = sanitizedScripts.filter(script => script.includes(service))
  const availableScriptsNoExt = availableScripts.map(script => script.split('.ts')[0].split(`${service}/`)[1])

  const script = await select({
    message: 'Select the script you want to run',
    choices: availableScriptsNoExt.map(script => ({ name: script, value: script })),
  })

  const scriptPath = scriptPaths.find(scriptPath => scriptPath.includes(script))

  try {
    const scriptFunction = await import(`${scriptPath}`)

    const result = await scriptFunction.default()

    if (typeof result !== 'undefined') {
      console.log(result)

      const path = `./src/outputs/${service}/${script}.json`
      const folderPath = path.split('/').slice(0, -1).join('/')

      if (!existsSync(folderPath)) mkdirSync(folderPath, { recursive: true })

      writeFile(path, JSON.stringify(result, null, 2), err => {
        if (err) console.log(err)
      })
    }
  } catch (err) {
    console.error(err)
  }
}
bootstrap()
