import useUnitHandler from '@src/hooks/useUnitHandler'

import useFilterNode from '../nodes/useFilterNode'
import { UnitType } from '../types'

const useFilterHighshelfUnit: UnitType = (id = 'filter-highshelf-unit') => {
  const { audioNode, controllers, handler } = useFilterNode('highshelf', {
    frequency: {
      id: 'Frequency',
      min: 2000,
      max: 15000,
      defaultValue: 10000,
    },
    gain: {
      id: 'Gain',
      min: -15,
      max: 15,
      step: 0.01,
      defaultValue: 0,
    },
  })

  const unitHandler = useUnitHandler({
    initialize: handler.initialize,
    connect: audioNode,
    reset: [controllers],
  })

  return { id, controllers: [controllers], unitHandler }
}

export default useFilterHighshelfUnit
