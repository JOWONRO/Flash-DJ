import { useState } from 'react'

import useControllers from './useControllers'

const exampleAudio =
  '/src/assets/Trainwreck Of Electro Swing - A Hat In Time Remix.mp3'

const useAudioSource = (src?: string) => {
  const { controllers, controllersHandler } = useControllers()

  const [audioContext, setAudioContext] = useState<AudioContext>()
  const [sourceNode, setSourceNode] = useState<AudioBufferSourceNode>()
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer>()
  const [isPlaying, setIsPlaying] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [playbackTime, setPlaybackTime] = useState(0)

  const audioHandler = {
    initAudio: async () => {
      const audioContext = new AudioContext()
      const audioResponse = await fetch(src || exampleAudio)
      const audioArrayBuffer = await audioResponse.arrayBuffer()
      const audioBuffer = await audioContext.decodeAudioData(audioArrayBuffer)

      controllersHandler.initControllers(audioContext)
      setAudioContext(audioContext)
      setAudioBuffer(audioBuffer)
    },
    play: () => {
      if (!audioContext || !audioBuffer) return
      const source = audioContext.createBufferSource()

      setIsPlaying(true)
      setSourceNode(source)
      setStartTime(audioContext.currentTime)
      controllersHandler.connectControllers(source)
      source.buffer = audioBuffer
      source.onended = () => {
        setIsPlaying(false)
        setPlaybackTime(0)
        setStartTime(0)
      }
      source.start(0, playbackTime % audioBuffer.duration)
    },
    pause: () => {
      if (!sourceNode || !audioContext) return

      setIsPlaying(false)
      setStartTime(audioContext.currentTime)
      setPlaybackTime(playbackTime + (audioContext.currentTime - startTime))
      sourceNode.onended = null
      sourceNode.stop()
    },
  }

  return {
    audioContext,
    isPlaying,
    controllers,
    audioHandler,
  }
}

export default useAudioSource