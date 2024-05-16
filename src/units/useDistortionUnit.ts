import useUnitHandler from '@src/hooks/useUnitHandler'
import useGainNode from '@src/nodes/useGainNode'
import useWaveShaperNode from '@src/nodes/useWaveShaperNode'
import { distortionCurves } from '@src/static/distortionCurves'
import { UnitType } from '@src/types'

const EXAMPLE_CURVE = distortionCurves.softAndHardClipping

const useDistortionUnit: UnitType = (id = 'distortion-unit') => {
  const {
    audioNode: outputGainNode,
    controllers: outputGainControllers,
    handler: outputGainHandler,
  } = useGainNode({
    id: 'Output Gain',
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 1,
  })
  const {
    audioNode: waveShaperNode,
    controllers: waveShaperControllers,
    handler: waveShaperHandler,
  } = useWaveShaperNode(EXAMPLE_CURVE, '4x', value => {
    /** The formula must change each time the distortion curve changes. */
    const gainValue = 2 / (1 + value / EXAMPLE_CURVE.option.max)
    outputGainControllers[0].handler.onChange(gainValue)
  })

  const unitHandler = useUnitHandler({
    initialize: async context => {
      await waveShaperHandler.initialize(context)
      await outputGainHandler.initialize(context)
    },
    connect: prevNode => {
      if (!waveShaperNode || !outputGainNode) return
      prevNode.connect(waveShaperNode)
      waveShaperNode.connect(outputGainNode)
      return outputGainNode
    },
    reset: [waveShaperControllers],
  })

  return { id, controllers: [waveShaperControllers], unitHandler }
}

export default useDistortionUnit
