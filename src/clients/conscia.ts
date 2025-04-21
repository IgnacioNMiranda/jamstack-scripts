import { environment } from '../environment'
import { resolve } from 'path'

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

const updateEnvVariable = async ({
  code,
  value,
  customerCode,
  environmentCode,
  prod,
}: {
  code: string
  value: string | number | boolean | Record<string, string | number | boolean>
  prod: boolean
  customerCode: string
  environmentCode: string
}) => {
  const response = await fetch(
    `${!prod ? BASE_STAGING_URL : BASE_PROD_URL}/experience/environment-variables/${code}`,
    {
      body: JSON.stringify({
        value,
      }),
      headers: {
        Authorization: `Bearer ${environment.conscia.token}`,
        'Content-Type': 'application/json',
        'X-Customer-Code': customerCode,
        'X-Environment-Code': environmentCode,
      },
      method: 'PATCH',
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
  secret?: any
  webhook?: any
  environmentVariable?: any
}

const importEnvironment = async ({
  prod,
  customerCode,
  environmentCode,
  preserveEnvironmentVariables,
  preserveSecrets,
}: {
  prod: boolean
  customerCode: string
  environmentCode: string
  preserveSecrets: boolean
  preserveEnvironmentVariables: boolean
}) => {
  const fullPath = resolve(__dirname, `../outputs/conscia/export-environment.json`)
  const config = (await import(fullPath)) as unknown as ConsciaEnvironmentConfig

  const jsonBody = {
    engineConfig: {
      connection: config.connection,
      contextField: config.contextField,
      component: config.component,
      componentTemplate: config.componentTemplate,
      channel: config.channel,
      componentType: config.componentType,
      connector: config.connector,
      secret: config.secret,
      webhook: config.webhook,
      environmentVariable: config.environmentVariable,
    },
  }

  const baseUrl = new URL(`${!prod ? BASE_STAGING_URL : BASE_PROD_URL}/engine-config`)

  if (preserveSecrets) baseUrl.searchParams.append('preserveSecrets', `${preserveSecrets}`)
  if (preserveEnvironmentVariables)
    baseUrl.searchParams.append('preserveEnvironmentVariables', `${preserveEnvironmentVariables}`)

  const response = await fetch(baseUrl, {
    headers: {
      Authorization: `Bearer ${environment.conscia.token}`,
      'Content-Type': 'application/json',
      'X-Customer-Code': customerCode,
      'X-Environment-Code': environmentCode,
    },
    method: 'PUT',
    body: JSON.stringify(jsonBody),
  })
  const data = await response.json()
  return data
}

const invalidateComponentCache = async ({
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
    `${!prod ? BASE_STAGING_URL : BASE_PROD_URL}/cache/components/${code}`,
    {
      headers: {
        Authorization: `Bearer ${environment.conscia.token}`,
        'X-Customer-Code': customerCode,
        'X-Environment-Code': environmentCode,
      },
      method: 'DELETE',
    },
  )

  return `OK Status: ${response.ok}`
}

const invalidateComponentCacheByTags = async ({
  code,
  customerCode,
  tags,
  environmentCode,
  prod,
}: {
  code: string
  prod: boolean
  tags: string[]
  customerCode: string
  environmentCode: string
}) => {
  const mappedTags: readonly [string, string][] = tags.map((tag) => ['cacheTag', tag])
  const params = new URLSearchParams(mappedTags)
  const url = `${!prod ? BASE_STAGING_URL : BASE_PROD_URL}/cache/components/${code}/tags?${params.toString()}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${environment.conscia.token}`,
      'X-Customer-Code': customerCode,
      'X-Environment-Code': environmentCode,
    },
    method: 'DELETE',
  })

  return `OK Status: ${response.ok}`
}

export const consciaClient = {
  createEnvVariable,
  updateEnvVariable,
  deleteEnvVariable,
  createSecret,
  updateSecret,
  exportEnvironment,
  importEnvironment,
  invalidateComponentCache,
  invalidateComponentCacheByTags,
}
