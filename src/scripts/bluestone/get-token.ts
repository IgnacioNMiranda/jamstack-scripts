import { bluestoneClient } from '../../clients/bluestone'

export default async () => {
  const response = await bluestoneClient.getToken()
  return response
}
