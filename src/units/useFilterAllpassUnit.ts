import useUnitHandler from '@src/hooks/useUnitHandler'

import useFilterNode from '../nodes/useFilterNode'
import { UnitType } from '../types'

const useFilterAllpassUnit: UnitType = (id = 'filter-allpass-unit') => {
  const { audioNode, controllers, handler } = useFilterNode('allpass', {
    frequency: {
      id: 'Frequency',
      min: 500,
      max: 5000,
      defaultValue: 1000,
    },
    q: {
      id: 'Q',
      min: 0.5,
      max: 5,
      step: 0.01,
      defaultValue: 1,
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

export default useFilterAllpassUnit
