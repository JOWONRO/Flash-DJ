import useController, { ControllerOption } from './useController'

const option: ControllerOption<BiquadFilterNode> = {
  config: [
    {
      id: 'filter-lowshelf-cutoff',
      min: 20,
      max: 2000,
      defaultValue: 20,
      onChange: (node, value) => {
        node.frequency.value = value
      },
      onReset: node => {
        node.frequency.value = option.config[0].defaultValue
      },
    },
    {
      id: 'filter-lowshelf-gain',
      min: -15,
      max: 15,
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
    filter.type = 'lowshelf'
    return filter
  },
}

const useFilterLowshelfController = () => useController(option)

export default useFilterLowshelfController
