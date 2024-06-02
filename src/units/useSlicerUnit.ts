import useUnitHandler from '@src/hooks/useUnitHandler'
import useGainNode from '@src/nodes/useGainNode'
import useOscillatorNode from '@src/nodes/useOscillatorNode'
import { UnitType } from '@src/types'

const useSlicerUnit: UnitType = (id = 'slicer-unit') => {
  const { audioNode: gainNode, handler: gainHandler } = useGainNode()
  const {
    audioNode: lfoNode,
    controllers: lfoControllers,
    handler: lfoHandler,
  } = useOscillatorNode('square', {
    frequency: {
      id: 'Frequency',
      defaultValue: 0,
      max: 20,
      min: 0,
      step: 0.1,
    },
  })
  const {
    audioNode: lfoGainNode,
    controllers: lfoGainControllers,
    handler: lfoGainHandler,
  } = useGainNode({
    id: 'Depth',
    defaultValue: 0,
    max: 1,
    min: 0,
    step: 0.01,
  })

  const controllers = [lfoControllers, lfoGainControllers]

  const unitHandler = useUnitHandler({
    initialize: async context => {
      await gainHandler.initialize(context)
      await lfoHandler.initialize(context)
      await lfoGainHandler.initialize(context)
    },
    connect: prevNode => {
      if (!gainNode || !lfoNode || !lfoGainNode) return
      lfoNode.connect(lfoGainNode)
      lfoGainNode.connect(gainNode.gain)
      prevNode.connect(gainNode)
      return gainNode
    },
    reset: controllers,
  })

  return { id, controllers, unitHandler }
}

export default useSlicerUnit
