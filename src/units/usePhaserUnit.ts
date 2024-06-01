import useUnitHandler from '@src/hooks/useUnitHandler'
import usePhaserNode from '@src/nodes/usePhaserNode'
import { phaserOptions } from '@src/processors/options'
import { UnitType } from '@src/types'

const { rate, depth, feedback } = phaserOptions

const usePhaserUnit: UnitType = (id = 'phaser-unit') => {
  const { audioNode, controllers, handler } = usePhaserNode({
    rate: {
      id: 'Rate',
      defaultValue: rate.defaultValue,
      max: rate.maxValue,
      min: rate.minValue,
      step: 0.1,
    },
    depth: {
      id: 'Depth',
      defaultValue: depth.defaultValue,
      max: depth.maxValue,
      min: depth.minValue,
      step: 0.01,
    },
    feedback: {
      id: 'Feedback',
      defaultValue: feedback.defaultValue,
      max: feedback.maxValue,
      min: feedback.minValue,
      step: 0.01,
    },
  })

  const unitHandler = useUnitHandler({
    initialize: handler.initialize,
    connect: audioNode,
    reset: [controllers],
  })

  return { id, controllers: [controllers], unitHandler }
}

export default usePhaserUnit
