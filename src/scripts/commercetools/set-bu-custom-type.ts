import { commercetoolsClient } from '../../clients/commercetools'
import type { BusinessUnit, BusinessUnitUpdate } from '@commercetools/platform-sdk'

const buCustomTypeId = '<id>'

export default async () => {
  try {
    const bus = await commercetoolsClient.businessUnits().get().execute()

    const updatedBus: BusinessUnit[] = []
    for (let i = 0; i < bus.body.results.length; i++) {
      const bu = bus.body.results[i]

      const fields = bu.custom?.fields
        ? Object.entries(bu.custom?.fields).reduce((prev, [currKey, currValue]) => {
            return { ...prev, [currKey]: currValue }
          }, {})
        : []

      const body: BusinessUnitUpdate = {
        version: bu.version,
        actions: [
          {
            action: 'setCustomType',
            type: {
              typeId: 'type',
              id: buCustomTypeId,
            },
            fields,
          },
        ],
      }

      const updatedBu = await commercetoolsClient
        .businessUnits()
        .withId({ ID: bu.id })
        .post({
          body,
        })
        .execute()
      updatedBus.push(updatedBu.body)
    }

    return updatedBus
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}
