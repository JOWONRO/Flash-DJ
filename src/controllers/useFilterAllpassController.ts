import useController, { ControllerOption } from './useController'

const option: ControllerOption<BiquadFilterNode> = {
  config: [
    {
      id: 'filter-allpass-center',
      min: 20,
      max: 20000,
      defaultValue: 1000,
      onChange: (node: BiquadFilterNode, value: number) => {
        node.frequency.value = value
      },
      onReset: (node: BiquadFilterNode) => {
        node.frequency.value = option.config[0].defaultValue
      },
    },
    {
      id: 'filter-allpass-q',
      min: 0.1,
      max: 10,
      step: 0.01,
      defaultValue: 10,
      onChange: (node: BiquadFilterNode, value: number) => {
        node.Q.value = value
      },
      onReset: (node: BiquadFilterNode) => {
        node.Q.value = option.config[1].defaultValue
      },
    },
  ],
  initialize: (context: AudioContext) => {
    const filter = context.createBiquadFilter()
    filter.type = 'allpass'
    return filter
  },
}

const useFilterAllpassController = () => useController(option)

export default useFilterAllpassController
