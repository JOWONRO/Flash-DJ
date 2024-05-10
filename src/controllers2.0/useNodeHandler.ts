import { useState } from 'react'

const useNodeHandler = <T extends AudioNode = AudioNode>(
  initialize: (context: AudioContext) => T,
) => {
  const [audioNode, setAudioNode] = useState<T>()

  const handler = {
    initialize: (context: AudioContext) => {
      const initializedNode = initialize(context)
      setAudioNode(initializedNode)
    },
    connectInput: (node: AudioNode) => {
      if (!audioNode) return
      node.connect(audioNode)
    },
    connectOutput: (node: AudioNode) => {
      if (!audioNode) return
      audioNode.connect(node)
    },
  }

  return { audioNode, handler }
}

export default useNodeHandler
