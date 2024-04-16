import { environment } from '../../environment'

export default async () => {
  const response = await fetch('https://api.vercel.com/v3/secrets', {
    headers: {
      Authorization: `Bearer ${environment.vercel.token}`,
    },
    method: 'get',
  })
  const data = await response.json()
  return data
}
