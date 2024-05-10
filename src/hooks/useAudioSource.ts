import { useState } from 'react'

import useUnits from './useUnits'

const exampleAudio =
  '/src/assets/Trainwreck Of Electro Swing - A Hat In Time Remix.mp3'

const useAudioSource = (src?: string) => {
  const { units, unitsHandler } = useUnits()

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

      unitsHandler.initUnits(audioContext)
      setAudioContext(audioContext)
      setAudioBuffer(audioBuffer)
    },
    play: () => {
      if (!audioContext || !audioBuffer) return
      const source = audioContext.createBufferSource()

      setIsPlaying(true)
      setSourceNode(source)
      setStartTime(audioContext.currentTime)
      unitsHandler.connectUnits(source)
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
    stop: () => {
      if (!sourceNode) return
      if (isPlaying) {
        sourceNode.stop()
        return
      }
      setPlaybackTime(0)
      setStartTime(0)
    },
  }

  return {
    audioContext,
    isPlaying,
    units,
    unitsHandler,
    audioHandler,
  }
}

export default useAudioSource
