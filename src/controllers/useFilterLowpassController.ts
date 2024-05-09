import useController, { ControllerOption } from './useController'

const option: ControllerOption<BiquadFilterNode> = {
  config: [
    {
      id: 'filter-lowpass',
      min: 500,
      max: 12000,
      defaultValue: 12000,
      onChange: (node, value) => {
        node.frequency.value = value
      },
      onReset: node => {
        node.frequency.value = option.config[0].defaultValue
      },
    },
  ],
  initialize: context => {
    const filter = context.createBiquadFilter()
    filter.type = 'lowpass'
    return filter
  },
}

const useFilterLowpassController = () => useController(option)

export default useFilterLowpassController
