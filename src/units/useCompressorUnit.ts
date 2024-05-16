import useUnitHandler from '@src/hooks/useUnitHandler'
import useCompressorNode from '@src/nodes/useCompresorNode'
import { UnitType } from '@src/types'

const useCompressorUnit: UnitType = (id = 'compressor-unit') => {
  const { audioNode, controllers, handler } = useCompressorNode({
    threshold: {
      id: 'Threshold',
      min: -100,
      max: 0,
      step: 1,
      defaultValue: 0,
    },
    knee: {
      id: 'Knee',
      min: 0,
      max: 40,
      step: 1,
      defaultValue: 0,
    },
    ratio: {
      id: 'Ratio',
      min: 1,
      max: 20,
      step: 1,
      defaultValue: 1,
    },
    attack: {
      id: 'Attack',
      min: 0.001,
      max: 1,
      step: 0.001,
      defaultValue: 0.1,
    },
    release: {
      id: 'Release',
      min: 0.01,
      max: 1,
      step: 0.01,
      defaultValue: 0.25,
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

export default useCompressorUnit
