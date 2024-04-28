import styled from 'styled-components'

import useAudioSource from './hooks/useAudioSource'

const App = () => {
  const { controllers, audioHandler } = useAudioSource()

  const handleAudio = () => {
    if (audioHandler.isPlaying) {
      audioHandler.pause()
      return
    }
    audioHandler.play()
  }

  return (
    <div>
      <button onClick={audioHandler.initAudio}>init</button>
      <button onClick={handleAudio}>play</button>
      {controllers.map(controller => (
        <StyledDiv key={controller.config.id}>
          {controller.config.id}{' '}
          <input
            type="range"
            {...controller.config}
            onChange={controller.handler.onChange}
          />
        </StyledDiv>
      ))}
    </div>
  )
}

export default App

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  gap: 12px;
  input {
    width: 400px;
  }
`
