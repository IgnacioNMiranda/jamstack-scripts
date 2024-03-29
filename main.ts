import inquirer from 'inquirer'
import { deepReadDir } from './src/utils'
import { writeFile } from 'fs'

const bootstrap = async () => {
  const scriptPaths: string[] = (await deepReadDir('src/scripts/')).flat(Number.POSITIVE_INFINITY)
  const sanitizedScripts = scriptPaths.map((script) => script.replace('src/scripts/', ''))
  const services = new Set(sanitizedScripts.map((script) => script.split('/')[0]))

  const serviceAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'service',
      message: 'Select the service you want to use',
      choices: [...services],
    },
  ])
  const { service } = serviceAnswer

  const availableScripts = sanitizedScripts.filter((script) => script.includes(service))
  const availableScriptsNoExt = availableScripts.map(
    (script) => script.split('.ts')[0].split(`${service}/`)[1],
  )

  const scriptAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'script',
      message: 'Select the script you want to run',
      choices: availableScriptsNoExt,
    },
  ])

  const script = scriptPaths.find((script) => script.includes(scriptAnswer.script))

  try {
    const scriptFunction = await import(`./${script}`)
    const result = await scriptFunction.default()

    if (typeof result !== 'undefined') {
      console.log(result)
      writeFile(
        `./src/outputs/${scriptAnswer.script}.json`,
        JSON.stringify(result, null, 2),
        (err) => {
          if (err) console.log(err)
        },
      )
    }
  } catch (err) {
    console.error(err)
  }
}
bootstrap()
