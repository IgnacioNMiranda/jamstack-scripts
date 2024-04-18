import { consciaClient } from '../../clients/conscia'

export default async () => {
  const response = await consciaClient.createSecret({
    secretKey: 'test',
    secretValue: 'test',
    dev: true,
  })
  return response
}
