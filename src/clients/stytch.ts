import { B2BClient, Client } from 'stytch'
import { environment } from '../environment'

export const stytchClient = new Client({
  project_id: environment.stytch.projectId,
  secret: environment.stytch.secret,
})

export const stytchB2BClient = new B2BClient({
  project_id: environment.stytch.projectId,
  secret: environment.stytch.secret,
})
