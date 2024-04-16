export default async () => {
  const response = await fetch('https://api.vercel.com/v3/secrets', {
    headers: {
      Authorization: 'Bearer <token>',
    },
    method: 'get',
  })
  const data = await response.json()
  return data
}
