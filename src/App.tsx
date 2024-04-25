import { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const App = () => {
  const [audioContext, setAudioContext] = useState<AudioContext>()
  const [sourceNode, setSourceNode] = useState<AudioBufferSourceNode>()
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer>()
  const [gainNode, setGainNode] = useState<GainNode>()
  const [isPlaying, setIsPlaying] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [playbackTime, setPlaybackTime] = useState(0)

  const initAudio = () => {
    const context = new AudioContext()
    const gain = context.createGain()

    fetch('/src/assets/Trainwreck Of Electro Swing - A Hat In Time Remix.mp3')
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
      .then(buffer => {
        setAudioBuffer(buffer)
        setAudioContext(context)
        setGainNode(gain)
        gain.connect(context.destination)
      })
  }

  // 게인 조절 핸들러
  const handleVolumeChange: ChangeEventHandler<HTMLInputElement> = event => {
    const volume = event.target.valueAsNumber
    if (gainNode) {
      gainNode.gain.value = volume
    }
  }

  // 오디오 재생 시작
  const startAudio = () => {
    if (!audioContext) return
    if (isPlaying) {
      if (!sourceNode) return
      setIsPlaying(false)
      console.log(audioContext.currentTime)
      setStartTime(audioContext.currentTime)
      setPlaybackTime(playbackTime + (audioContext.currentTime - startTime))
      sourceNode.stop()
      return
    }
    if (!audioBuffer || !gainNode) return
    const source = audioContext.createBufferSource()
    source.buffer = audioBuffer
    source.connect(gainNode)
    source.onended = () => {
      setPlaybackTime(0)
      setStartTime(0)
      setIsPlaying(false)
    }
    source.start(0, playbackTime % audioBuffer.duration)
    setSourceNode(source)
    setIsPlaying(true)
    setStartTime(audioContext.currentTime)
  }

  return (
    <div>
      <button onClick={initAudio}>init</button>
      <button onClick={startAudio}>play</button>
      <StyledDiv>
        Gain
        <input
          type="range"
          id="volumeControl"
          min="0"
          max="2"
          step="0.01"
          defaultValue="1"
          onChange={handleVolumeChange}
        />
      </StyledDiv>
    </div>
  )
}

const StyledDiv = styled.div`
  displaying: flex;
`

export default App
