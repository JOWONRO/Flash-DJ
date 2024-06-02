import { useEffect } from 'react'

import useUnitHandler from '@src/hooks/useUnitHandler'
import useGainNode from '@src/nodes/useGainNode'
import useOscillatorNode from '@src/nodes/useOscillatorNode'
import { UnitType } from '@src/types'

const useRingModularUnit: UnitType = (id = 'ring-modular-unit') => {
  const {
    audioNode: gainNode,
    controllers: gainControllers,
    handler: gainHandler,
  } = useGainNode({
    defaultValue: 0,
  })
  const {
    audioNode: lfoNode,
    controllers: lfoControllers,
    handler: lfoHandler,
  } = useOscillatorNode('sine', {
    frequency: {
      id: 'Frequency',
      defaultValue: 0,
      max: 1000,
      min: 0,
    },
  })

  useEffect(() => {
    if (lfoControllers[0].value === undefined) return
    gainControllers[0].handler.onChange(lfoControllers[0].value === 0 ? 1 : 0)
  }, [gainControllers, lfoControllers])

  const unitHandler = useUnitHandler({
    initialize: async context => {
      await gainHandler.initialize(context)
      await lfoHandler.initialize(context)
    },
    connect: prevNode => {
      if (!gainNode || !lfoNode) return
      lfoNode.connect(gainNode.gain)
      prevNode.connect(gainNode)
      return gainNode
    },
    reset: [lfoControllers],
  })

  return { id, controllers: [lfoControllers], unitHandler }
}

export default useRingModularUnit
