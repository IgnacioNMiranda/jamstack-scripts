import { stytchClient } from '../../../clients/stytch'

export default async () => {
  const users = await stytchClient.users.search({})
  return users
}
