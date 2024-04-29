import { useState } from 'react'

const useGainController = () => {
  const [gainNode, setGainNode] = useState<GainNode>()

  const config = [
    {
      id: 'gain',
      min: 0,
      max: 2,
      step: 0.01,
      defaultValue: 1,
    },
  ]

  const handler = {
    onChange: {
      [config[0].id]: (value: number) => {
        if (!gainNode) return
        gainNode.gain.value = value
      },
    },
    reset: (gain?: GainNode) => {
      const node = gain ?? gainNode
      if (!node) return
      node.gain.value = config[0].defaultValue
    },
    initialize: (context: AudioContext) => {
      const gain = context.createGain()
      handler.reset(gain)
      setGainNode(gain)
    },
    connect: (node: AudioNode) => {
      gainNode && node.connect(gainNode)
    },
  }

  return {
    node: gainNode,
    config,
    handler,
  }
}

export default useGainController
