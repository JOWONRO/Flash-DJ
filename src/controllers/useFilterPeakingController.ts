import useController, { ControllerOption } from './useController'

const option: ControllerOption<BiquadFilterNode> = {
  config: [
    {
      id: 'filter-peaking-center',
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
      id: 'filter-peaking-gain',
      min: -15,
      max: 15,
      defaultValue: 0,
      onChange: (node: BiquadFilterNode, value: number) => {
        node.gain.value = value
      },
      onReset: (node: BiquadFilterNode) => {
        node.gain.value = option.config[1].defaultValue
      },
    },
    {
      id: 'filter-peaking-q',
      min: 0,
      max: 10,
      step: 0.01,
      defaultValue: 0,
      onChange: (node: BiquadFilterNode, value: number) => {
        node.Q.value = value
      },
      onReset: (node: BiquadFilterNode) => {
        node.Q.value = option.config[2].defaultValue
      },
    },
  ],
  initialize: (context: AudioContext) => {
    const filter = context.createBiquadFilter()
    filter.type = 'peaking'
    return filter
  },
}

const useFilterPeakingController = () => useController(option)

export default useFilterPeakingController
