import useUnitHandler from '@src/hooks/useUnitHandler'

import useFilterNode from '../nodes/useFilterNode'
import { UnitType } from '../types'

const useFilterHighpassUnit: UnitType = (id = 'filter-highpass-unit') => {
  const { audioNode, controllers, handler } = useFilterNode('highpass', {
    frequency: {
      id: 'Cutoff',
      min: 20,
      max: 10000,
      defaultValue: 20,
    },
    q: {
      id: 'Q',
      min: 0.7,
      max: 1.5,
      step: 0.01,
      defaultValue: 0.7,
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

export default useFilterHighpassUnit
