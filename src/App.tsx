import { ChangeEventHandler, useEffect, useRef, useState } from 'react'

const App = () => {
  const [audioContext, setAudioContext] = useState<AudioContext>()
  const [sourceNode, setSourceNode] = useState<AudioBufferSourceNode>()
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer>()
  const [gainNode, setGainNode] = useState<GainNode>()
  const [isPlay, setIsPlay] = useState(false)
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
    // const context = new AudioContext()
    // const source = context.createBufferSource()
    // const gain = context.createGain()

    // fetch('/src/assets/Trainwreck Of Electro Swing - A Hat In Time Remix.mp3')
    //   .then(response => response.arrayBuffer())
    //   .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    //   .then(audioBuffer => (source.buffer = audioBuffer))

    // source.connect(gain).connect(context.destination)
    // setAudioContext(context)
    // setSourceNode(source)
    // setGainNode(gain)
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
    if (isPlay && sourceNode) {
      setPlaybackTime(audioContext.currentTime)
      sourceNode.stop()
    } else {
      if (!audioBuffer || !gainNode) return
      const source = audioContext.createBufferSource()
      source.buffer = audioBuffer
      source.loop = true
      source.connect(gainNode)
      source.start(0, playbackTime % audioBuffer.duration) // playbackTime에서 시작
      setSourceNode(source)
    }
    setIsPlay(prev => !prev)
  }

  return (
    <div>
      <button onClick={initAudio}>init</button>
      <button onClick={startAudio}>play</button>
      <input
        type="range"
        id="volumeControl"
        min="0"
        max="2"
        step="0.01"
        defaultValue="1"
        onChange={handleVolumeChange}
      />
    </div>
  )
}

export default App
