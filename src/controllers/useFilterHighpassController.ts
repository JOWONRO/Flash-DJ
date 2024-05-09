import useController, { ControllerOption } from './useController'

const option: ControllerOption<BiquadFilterNode> = {
  config: [
    {
      id: 'filter-highpass',
      min: 20,
      max: 5000,
      defaultValue: 20,
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
    filter.type = 'highpass'
    return filter
  },
}

const useFilterHighpassController = () => useController(option)

export default useFilterHighpassController
