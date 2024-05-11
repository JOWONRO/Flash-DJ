import { useState } from 'react'

const useNodeHandler = <T extends AudioNode = AudioNode>(
  initialize: (context: AudioContext) => Promise<T>,
) => {
  const [audioNode, setAudioNode] = useState<T>()
  const [context, setContext] = useState<AudioContext>()

  const handler = {
    initialize: async (context: AudioContext) => {
      const initializedNode = await initialize(context)
      setAudioNode(initializedNode)
      setContext(context)
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

  return { context, audioNode, handler }
}

export default useNodeHandler
