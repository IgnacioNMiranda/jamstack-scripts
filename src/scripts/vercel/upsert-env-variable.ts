import { environment } from '../../environment'

export default async () => {
  const response = await fetch(
    `https://api.vercel.com/v10/projects/${environment.vercel.projectId}/env?upsert=true`,
    {
      body: JSON.stringify({
        key: 'secret_test',
        value: 'test',
        type: 'encrypted',
        target: ['preview', 'development'],
      }),
      headers: {
        Authorization: `Bearer ${environment.vercel.token}`,
      },
      method: 'post',
    },
  )
  const data = await response.json()
  return data
}
