import { stytchB2BClient } from '../../../clients/stytch'
import { input } from '@inquirer/prompts'

const timeLabel = 'Authenticate Stytch JWT'

export default async () => {
  const jwt = await input({ message: 'Enter your jwt:' })

  console.time(timeLabel)
  await stytchB2BClient.sessions.authenticateJwtLocal({ session_jwt: jwt })
  console.timeEnd(timeLabel)

  // Second validation should take no time since jwks were already obtained
  console.time(timeLabel)
  const localSession = await stytchB2BClient.sessions.authenticateJwtLocal({ session_jwt: jwt })
  console.timeEnd(timeLabel)

  return localSession
}
