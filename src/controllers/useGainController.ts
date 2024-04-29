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
    node: gainNode,
    onChange: {
      [config[0].id]: (value: number) => {
        if (!gainNode) return
        gainNode.gain.value = value
      },
    },
    initialize: (context: AudioContext) => {
      const gain = context.createGain()
      gain.gain.value = config[0].defaultValue
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
