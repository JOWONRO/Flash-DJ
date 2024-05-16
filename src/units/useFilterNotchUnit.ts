import useUnitHandler from '@src/hooks/useUnitHandler'

import useFilterNode from '../nodes/useFilterNode'
import { UnitType } from '../types'

const useFilterNotchUnit: UnitType = (id = 'filter-notch-unit') => {
  const { audioNode, controllers, handler } = useFilterNode('notch', {
    frequency: {
      id: 'Center',
      min: 20,
      max: 20000,
      defaultValue: 1000,
    },
    q: {
      id: 'Q',
      min: 0.1,
      max: 20,
      step: 0.01,
      defaultValue: 20,
    },
  })

  const unitHandler = useUnitHandler({
    controllers: [controllers],
    initialize: handler.initialize,
    connect: node => {
      if (!audioNode) return
      node.connect(audioNode)
      return audioNode
    },
  })

  return { id, controllers: [controllers], unitHandler }
}

export default useFilterNotchUnit
