import { environment } from '../../environment'

// Commercetools internal auth response
export type AuthResponse = {
  access_token: string
  token_type: 'Bearer'
  expires_in: number
  scope: string
  refresh_token?: string
}

export default async () => {
  const response = await fetch(
    `https://auth.${environment.commercetools.region}.commercetools.com/oauth/${environment.commercetools.projectKey}/anonymous/token?grant_type=client_credentials`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${environment.commercetools.clientId}:${environment.commercetools.clientSecret}`,
          'utf-8',
        ).toString('base64')}`,
      },
    },
  )

  const responseJson = (await response.json()) as AuthResponse
  return responseJson.access_token
}
