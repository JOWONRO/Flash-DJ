import useUnitHandler from '@src/hooks/useUnitHandler'

import useFilterNode from '../nodes/useFilterNode'
import { UnitType } from '../types'

const useFilterBandpassUnit: UnitType = (id = 'filter-bandpass-unit') => {
  const { audioNode, controllers, handler } = useFilterNode('bandpass', {
    frequency: {
      id: 'Frequency',
      min: 50,
      max: 15000,
      defaultValue: 1000,
    },
    q: {
      id: 'Q',
      min: 0.1,
      max: 10,
      step: 0.01,
      defaultValue: 0.1,
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

export default useFilterBandpassUnit
