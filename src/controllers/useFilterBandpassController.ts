import useController, { ControllerOption } from './useController'

const option: ControllerOption<BiquadFilterNode> = {
  config: [
    {
      id: 'filter-bandpass-center',
      min: 100,
      max: 10000,
      defaultValue: 1000,
      onChange: (node, value) => {
        node.frequency.value = value
      },
      onReset: node => {
        node.frequency.value = option.config[0].defaultValue
      },
    },
    {
      id: 'filter-bandpass-q',
      min: 0,
      max: 10,
      step: 0.01,
      defaultValue: 0,
      onChange: (node, value) => {
        node.Q.value = value
      },
      onReset: node => {
        node.Q.value = option.config[1].defaultValue
      },
    },
  ],
  initialize: context => {
    const filter = context.createBiquadFilter()
    filter.type = 'bandpass'
    return filter
  },
}

const useFilterBandpassController = () => useController(option)

export default useFilterBandpassController
