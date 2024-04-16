export default async () => {
  const response = await fetch(
    'https://api.vercel.com/v10/projects/prj_lbgUtnS2yAqTyShEXmR9w8gpgr8m/env?upsert=true',
    {
      body: JSON.stringify({
        key: 'SECRET',
        value: 'secret',
        type: 'encrypted',
        target: ['preview'],
        gitBranch: 'dev',
      }),
      headers: {
        Authorization: 'Bearer <token>',
      },
      method: 'post',
    },
  )
  const data = await response.json()
  return data
}
