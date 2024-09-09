import { environment } from '../environment'

const BASE_SANDBOX_URL = 'https://engine-staging.conscia.io/api'
const BASE_PROD_URL = 'https://engine.conscia.io/api'

const createSecret = async ({
  secretKey,
  secretValue,
  dev,
}: {
  secretKey: string
  secretValue: string
  dev: boolean
}) => {
  const response = await fetch(`${dev ? BASE_SANDBOX_URL : BASE_PROD_URL}/experience/secrets`, {
    body: JSON.stringify({
      secretCode: secretKey,
      name: secretKey,
      value: secretValue,
    }),
    headers: {
      Authorization: `Bearer ${environment.conscia.token}`,
      'Content-Type': 'application/json',
      'X-Customer-Code': environment.conscia.customerCode,
    },
    method: 'POST',
  })

  const data = await response.json()
  return data
}

const updateSecret = async ({
  secretKey,
  secretValue,
  dev,
}: {
  secretKey: string
  secretValue: string
  dev: boolean
}) => {
  const response = await fetch(
    `${dev ? BASE_SANDBOX_URL : BASE_PROD_URL}/experience/secrets/${secretKey}`,
    {
      body: JSON.stringify({
        value: secretValue,
      }),
      headers: {
        Authorization: `Bearer ${environment.conscia.token}`,
        'Content-Type': 'application/json',
        'X-Customer-Code': environment.conscia.customerCode,
      },
      method: 'PUT',
    },
  )
  const data = await response.json()
  return data
}

const exportEnvironment = async ({ dev }: { dev: boolean }) => {
  const response = await fetch(`${dev ? BASE_SANDBOX_URL : BASE_PROD_URL}/raw-engine-config`, {
    headers: {
      Authorization: `Bearer ${environment.conscia.token}`,
      'Content-Type': 'application/json',
      'X-Customer-Code': environment.conscia.customerCode,
      'X-Environment-Code': environment.conscia.environment,
    },
    method: 'GET',
  })
  const data = await response.json()
  return data
}

export const consciaClient = {
  createSecret,
  updateSecret,
  exportEnvironment,
}
