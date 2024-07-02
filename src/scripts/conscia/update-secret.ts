import { consciaClient } from '../../clients/conscia'

export default async () => {
  const response = await consciaClient.updateSecret({
    secretKey: 'test',
    secretValue: 'test2',
    dev: true,
  })
  return response
}
