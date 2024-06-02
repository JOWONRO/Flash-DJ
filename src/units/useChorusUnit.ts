import useUnitHandler from '@src/hooks/useUnitHandler'
import useDelayNode from '@src/nodes/useDelayNode'
import useGainNode from '@src/nodes/useGainNode'
import useOscillatorNode from '@src/nodes/useOscillatorNode'
import { UnitType } from '@src/types'

const useChorusUnit: UnitType = (id = 'chorus-unit') => {
  const { audioNode: mixNode, handler: mixHandler } = useGainNode()
  const { audioNode: mainGainNode, handler: mainGainHandler } = useGainNode({
    defaultValue: 0.5,
  })
  const {
    audioNode: delayNode,
    controllers: delayControllers,
    handler: delayHandler,
  } = useDelayNode({
    id: 'Delay time',
    defaultValue: 0,
    max: 0.05,
    min: 0,
    step: 0.001,
  })
  const {
    audioNode: lfoNode,
    controllers: lfoControllers,
    handler: lfoHandler,
  } = useOscillatorNode('sine', {
    frequency: {
      id: 'Rate',
      defaultValue: 0,
      max: 5,
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
    max: 0.004,
    min: 0,
    step: 0.0001,
  })

  const controllers = [delayControllers, lfoControllers, lfoGainControllers]

  const unitHandler = useUnitHandler({
    initialize: async context => {
      await mixHandler.initialize(context)
      await delayHandler.initialize(context)
      await lfoHandler.initialize(context)
      await lfoGainHandler.initialize(context)
      await mainGainHandler.initialize(context)
    },
    connect: prevNode => {
      if (!delayNode || !lfoNode || !lfoGainNode || !mainGainNode || !mixNode)
        return
      lfoNode.connect(lfoGainNode)
      lfoGainNode.connect(delayNode.delayTime)
      prevNode.connect(delayNode)
      delayNode.connect(mainGainNode)
      mainGainNode.connect(mixNode)
      prevNode.connect(mixNode)
      return mixNode
    },
    reset: controllers,
  })

  return { id, controllers, unitHandler }
}

export default useChorusUnit
