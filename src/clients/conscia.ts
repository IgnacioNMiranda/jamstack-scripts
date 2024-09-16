import { environment } from '../environment'

const BASE_STAGING_URL = 'https://engine-staging.conscia.io/api'
const BASE_PROD_URL = 'https://engine.conscia.io/api'

const createSecret = async ({
  secretKey,
  secretValue,
  prod,
}: {
  secretKey: string
  secretValue: string
  prod: boolean
}) => {
  const response = await fetch(`${!prod ? BASE_STAGING_URL : BASE_PROD_URL}/experience/secrets`, {
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
  prod,
}: {
  secretKey: string
  secretValue: string
  prod: boolean
}) => {
  const response = await fetch(
    `${!prod ? BASE_STAGING_URL : BASE_PROD_URL}/experience/secrets/${secretKey}`,
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

const createEnvVariable = async ({
  code,
  name,
  value,
  customerCode,
  environmentCode,
  prod,
}: {
  code: string
  name: string
  value: string | number | boolean | Record<string, string | number | boolean>
  prod: boolean
  customerCode: string
  environmentCode: string
}) => {
  const response = await fetch(
    `${!prod ? BASE_STAGING_URL : BASE_PROD_URL}/experience/environment-variables`,
    {
      body: JSON.stringify({
        environmentVariableCode: code,
        name,
        value,
      }),
      headers: {
        Authorization: `Bearer ${environment.conscia.token}`,
        'Content-Type': 'application/json',
        'X-Customer-Code': customerCode,
        'X-Environment-Code': environmentCode,
      },
      method: 'POST',
    },
  )
  const data = await response.json()
  return data
}

const deleteEnvVariable = async ({
  code,
  customerCode,
  environmentCode,
  prod,
}: {
  code: string
  prod: boolean
  customerCode: string
  environmentCode: string
}) => {
  const response = await fetch(
    `${!prod ? BASE_STAGING_URL : BASE_PROD_URL}/experience/environment-variables/${code}`,
    {
      headers: {
        Authorization: `Bearer ${environment.conscia.token}`,
        'X-Customer-Code': customerCode,
        'X-Environment-Code': environmentCode,
      },
      method: 'DELETE',
    },
  )
  const data = await response.json()
  return data
}

const exportEnvironment = async ({
  customerCode,
  environmentCode,
  prod,
}: {
  customerCode: string
  environmentCode: string
  prod: boolean
}) => {
  const response = await fetch(`${!prod ? BASE_STAGING_URL : BASE_PROD_URL}/raw-engine-config`, {
    headers: {
      Authorization: `Bearer ${environment.conscia.token}`,
      'Content-Type': 'application/json',
      'X-Customer-Code': customerCode,
      'X-Environment-Code': environmentCode,
    },
    method: 'GET',
  })
  const data = await response.json()
  return data
}

type ConsciaEnvironmentConfig = {
  connection?: any
  contextField?: any
  component?: any
  componentTemplate?: any
  channel?: any
  componentType?: any
  connector?: any
  webhook?: any
}

const importEnvironment = async ({
  prod,
  customerCode,
  environmentCode,
}: {
  prod: boolean
  customerCode: string
  environmentCode: string
}) => {
  const config = (await import(
    `../outputs/conscia/export-environment.json`
  )) as unknown as ConsciaEnvironmentConfig

  const response = await fetch(`${!prod ? BASE_STAGING_URL : BASE_PROD_URL}/engine-config`, {
    headers: {
      Authorization: `Bearer ${environment.conscia.token}`,
      'Content-Type': 'application/json',
      'X-Customer-Code': customerCode,
      'X-Environment-Code': environmentCode,
    },
    method: 'PUT',
    body: JSON.stringify({
      engineConfig: {
        connection: config.connection,
        contextField: config.contextField,
        webhook: config.webhook,
        component: config.component,
        componentTemplate: config.componentTemplate,
        channel: config.channel,
        componentType: config.componentType,
        connector: config.connector,
      },
    }),
  })
  const data = await response.json()
  return data
}

export const consciaClient = {
  createEnvVariable,
  deleteEnvVariable,
  createSecret,
  updateSecret,
  exportEnvironment,
  importEnvironment,
}
