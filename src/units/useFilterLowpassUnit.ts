import useUnitHandler from '@src/hooks/useUnitHandler'

import useFilterNode from '../nodes/useFilterNode'
import { UnitType } from '../types'

const useFilterLowpassUnit: UnitType = (id = 'filter-lowpass-unit') => {
  const { audioNode, controllers, handler } = useFilterNode('lowpass', {
    frequency: {
      id: 'Filter-Lowpass-Cutoff',
      min: 100,
      max: 20000,
      defaultValue: 20000,
    },
    q: {
      id: 'Filter-Lowpass-Q',
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

export default useFilterLowpassUnit
