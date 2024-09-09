import { consciaClient } from '../../clients/conscia'

export default async () => {
  const response = await consciaClient.exportEnvironment({
    dev: false,
  })
  return response
}
