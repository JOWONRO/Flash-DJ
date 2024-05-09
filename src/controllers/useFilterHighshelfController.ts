import useController, { ControllerOption } from './useController'

const option: ControllerOption<BiquadFilterNode> = {
  config: [
    {
      id: 'filter-highshelf-cutoff',
      min: 2000,
      max: 12000,
      defaultValue: 12000,
      onChange: (node, value) => {
        node.frequency.value = value
      },
      onReset: node => {
        node.frequency.value = option.config[0].defaultValue
      },
    },
    {
      id: 'filter-highshelf-gain',
      min: -20,
      max: 20,
      defaultValue: 0,
      onChange: (node, value) => {
        node.gain.value = value
      },
      onReset: node => {
        node.gain.value = option.config[1].defaultValue
      },
    },
  ],
  initialize: context => {
    const filter = context.createBiquadFilter()
    filter.type = 'highshelf'
    return filter
  },
}

const useFilterHighshelfController = () => useController(option)

export default useFilterHighshelfController
