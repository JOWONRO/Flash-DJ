import styled from 'styled-components'

import useAudioSource from './hooks/useAudioSource'

const App = () => {
  const { audioContext, isPlaying, controllers, audioHandler } =
    useAudioSource()

  const handleAudio = () => {
    if (isPlaying) {
      audioHandler.pause()
      return
    }
    audioHandler.play()
  }

  return (
    <div>
      <button onClick={audioHandler.initAudio}>init</button>
      <button onClick={handleAudio} disabled={!audioContext}>
        play
      </button>
      {controllers.map(controller => (
        <div style={{ display: 'flex' }} key={controller.config[0].id}>
          {controller.config.map(config => (
            <StyledDiv key={config.id}>
              {config.id}{' '}
              <input
                type="range"
                {...config}
                onChange={e =>
                  controller.handler.onChange[config.id](e.target.valueAsNumber)
                }
              />
            </StyledDiv>
          ))}
        </div>
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
