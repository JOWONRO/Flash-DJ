import useUnitHandler from '@src/hooks/useUnitHandler'
import useBitCrusherNode from '@src/nodes/useBitCrusherNode'
import useFilterNode from '@src/nodes/useFilterNode'
import { bitCrusherOptions } from '@src/processors/options'
import { UnitType } from '@src/types'

const { bitDepth, frequency } = bitCrusherOptions

const useLoFiUnit: UnitType = (id = 'lofi-unit') => {
  const {
    audioNode: bitCrusherNode,
    controllers: bitCrusherControllers,
    handler: bitCrusherHandler,
  } = useBitCrusherNode({
    bitDepth: {
      id: 'Bit Depth',
      defaultValue: bitDepth.defaultValue,
      max: bitDepth.maxValue,
      min: bitDepth.minValue,
    },
    frequency: {
      id: 'Frequency',
      defaultValue: frequency.defaultValue,
      max: frequency.maxValue,
      min: frequency.minValue,
      step: 0.01,
    },
  })
  const {
    audioNode: lowpassNode,
    controllers: lowpassControllers,
    handler: lowpassHandler,
  } = useFilterNode('lowpass', {
    frequency: {
      id: 'Low Pass Frequency',
      defaultValue: 20000,
      max: 20000,
      min: 0,
    },
  })
  const {
    audioNode: highpassNode,
    controllers: highpassControllers,
    handler: highpassHandler,
  } = useFilterNode('highpass', {
    frequency: {
      id: 'High Pass Frequency',
      defaultValue: 0,
      max: 20000,
      min: 0,
    },
  })

  const controllers = [
    bitCrusherControllers,
    lowpassControllers,
    highpassControllers,
  ]

  const unitHandler = useUnitHandler({
    initialize: async context => {
      await bitCrusherHandler.initialize(context)
      await lowpassHandler.initialize(context)
      await highpassHandler.initialize(context)
    },
    connect: prevNode => {
      if (!bitCrusherNode || !lowpassNode || !highpassNode) return
      prevNode.connect(bitCrusherNode)
      bitCrusherNode.connect(lowpassNode)
      lowpassNode.connect(highpassNode)
      return highpassNode
    },
    reset: controllers,
  })

  return { id, controllers, unitHandler }
}

export default useLoFiUnit
