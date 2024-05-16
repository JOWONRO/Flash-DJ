import useUnitHandler from '@src/hooks/useUnitHandler'
import useConvolverNode from '@src/nodes/useConvolverNode'
import useGainNode from '@src/nodes/useGainNode'
import { reverbIRs } from '@src/static/reverbIRs'
import { UnitType } from '@src/types'

const EXAMPLE_IR = reverbIRs.halls.amsterdamHall

const useReverbUnit: UnitType = (id = 'reverb-unit') => {
  const { audioNode: convolverNode, handler: convolverHandler } =
    useConvolverNode(EXAMPLE_IR)
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

  const controllers = [wetControllers, dryControllers]

  const unitHandler = useUnitHandler({
    controllers,
    initialize: async context => {
      await convolverHandler.initialize(context)
      await mixHandler.initialize(context)
      await wetHandler.initialize(context)
      await dryHandler.initialize(context)
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
  })

  return { id, controllers, unitHandler }
}

export default useReverbUnit
