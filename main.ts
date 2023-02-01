import inquirer from 'inquirer'
import { exec } from 'child_process'
import { deepReadDir } from './src/utils'

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
  exec(`ts-node-dev ${script}`).stdout?.pipe(process.stdout)
}
bootstrap()
