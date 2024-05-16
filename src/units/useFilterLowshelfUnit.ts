import useUnitHandler from '@src/hooks/useUnitHandler'

import useFilterNode from '../nodes/useFilterNode'
import { UnitType } from '../types'

const useFilterLowshelfUnit: UnitType = (id = 'filter-lowshelf-unit') => {
  const { audioNode, controllers, handler } = useFilterNode('lowshelf', {
    frequency: {
      id: 'Frequency',
      min: 100,
      max: 1000,
      defaultValue: 100,
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

export default useFilterLowshelfUnit
