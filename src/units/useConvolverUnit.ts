import useConvolverNode from '@src/nodes/useConvolverNode'
import useGainNode from '@src/nodes/useGainNode'
import { UnitHandler } from '@src/types'
import { nanoid } from 'nanoid'

const ID = nanoid()

const useConvolverUnit = () => {
  const { audioNode: convolverNode, handler: convolverHandler } =
    useConvolverNode()
  const { audioNode: mixNode, handler: mixHandler } = useGainNode()
  const {
    audioNode: wetNode,
    controllers: wetControllers,
    handler: wetHandler,
  } = useGainNode({
    id: 'Wet',
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 0,
  })
  const {
    audioNode: dryNode,
    controllers: dryControllers,
    handler: dryHandler,
  } = useGainNode({
    id: 'Dry',
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 1,
  })

  const unitHandler: UnitHandler = {
    initialize: async context => {
      await convolverHandler.initialize(context)
      await mixHandler.initialize(context)
      await wetHandler.initialize(context)
      await dryHandler.initialize(context)
    },
    reset: () => {
      wetControllers.forEach(controller => controller.handler.reset())
      dryControllers.forEach(controller => controller.handler.reset())
    },
    connect: node => {
      if (!convolverNode || !dryNode || !wetNode || !mixNode) return
      node.connect(convolverNode)
      node.connect(dryNode)
      convolverNode.connect(wetNode)
      wetNode.connect(mixNode)
      dryNode.connect(mixNode)
      return mixNode
    },
  }

  return {
    id: `convolver-${ID}`,
    controllers: [wetControllers, dryControllers],
    unitHandler,
  }
}

export default useConvolverUnit
