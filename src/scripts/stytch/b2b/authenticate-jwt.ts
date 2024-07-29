import { stytchB2BClient } from '../../../clients/stytch'
import { input } from '@inquirer/prompts'

const timeLabel = 'Authenticate Stytch JWT'

export default async () => {
  const jwt = await input({ message: 'Enter your jwt:' })

  console.time(timeLabel)
  const session = await stytchB2BClient.sessions.authenticateJwt({ session_jwt: jwt })
  console.timeEnd(timeLabel)

  return session
}
