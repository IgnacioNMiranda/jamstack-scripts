import { Client } from 'stytch'
import { environment } from '../../environment'

export default async () => {
  const client = new Client({
    project_id: environment.stytch.projectId,
    secret: environment.stytch.secret,
  })

  const users = await client.users.search({})
  return users
}
