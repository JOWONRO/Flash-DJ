import useController, { ControllerOption } from './useController'

const option: ControllerOption<GainNode> = {
  config: [
    {
      id: 'gain',
      min: 0,
      max: 2,
      step: 0.01,
      defaultValue: 1,
      onChange: (node, value) => {
        node.gain.value = value
      },
      onReset: node => {
        node.gain.value = option.config[0].defaultValue
      },
    },
  ],
  initialize: (context: AudioContext) => {
    const gainNode = context.createGain()
    return gainNode
  },
}

const useGainController = () => useController(option)

export default useGainController
