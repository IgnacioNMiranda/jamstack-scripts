import { environment } from '../environment'

const getToken = async () => {
  const response = await fetch(environment.bluestone.authUrl, {
    body: new URLSearchParams({
      client_id: environment.bluestone.clientId,
      client_secret: environment.bluestone.clientSecret,
      grant_type: 'client_credentials',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    method: 'POST',
  })

  const data = await response.json()
  return data
}

export const bluestoneClient = {
  getToken,
}
