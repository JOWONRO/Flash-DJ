import useUnitHandler from '@src/hooks/useUnitHandler'
import useChorusNode from '@src/nodes/useChorusNode'
import { chorusOptions } from '@src/processors/options'
import { UnitType } from '@src/types'

const { delayTime, depth, rate } = chorusOptions

const useChorusUnit: UnitType = (id = 'chorus-unit') => {
  const { audioNode, controllers, handler } = useChorusNode({
    delayTime: {
      id: 'DelayTime',
      defaultValue: delayTime.defaultValue,
      max: delayTime.maxValue,
      min: delayTime.minValue,
      step: 0.001,
    },
    depth: {
      id: 'Depth',
      defaultValue: depth.defaultValue,
      max: depth.maxValue,
      min: depth.minValue,
      step: 0.0001,
    },
    rate: {
      id: 'Rate',
      defaultValue: rate.defaultValue,
      max: rate.maxValue,
      min: rate.minValue,
      step: 0.1,
    },
  })

  const unitHandler = useUnitHandler({
    initialize: handler.initialize,
    connect: audioNode,
    reset: [controllers],
  })

  return { id, controllers: [controllers], unitHandler }
}

export default useChorusUnit
