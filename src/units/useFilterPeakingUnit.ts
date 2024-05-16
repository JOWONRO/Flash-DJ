import useUnitHandler from '@src/hooks/useUnitHandler'

import useFilterNode from '../nodes/useFilterNode'
import { UnitType } from '../types'

const useFilterPeakingUnit: UnitType = (id = 'filter-peaking-unit') => {
  const { audioNode, controllers, handler } = useFilterNode('peaking', {
    frequency: {
      id: 'Center',
      min: 100,
      max: 10000,
      defaultValue: 1000,
    },
    gain: {
      id: 'Gain',
      min: -15,
      max: 15,
      defaultValue: 0,
    },
    q: {
      id: 'Q',
      min: 0.5,
      max: 10,
      step: 0.01,
      defaultValue: 1,
    },
  })

  const unitHandler = useUnitHandler({
    initialize: handler.initialize,
    connect: audioNode,
    reset: [controllers],
  })

  return { id, controllers: [controllers], unitHandler }
}

export default useFilterPeakingUnit
