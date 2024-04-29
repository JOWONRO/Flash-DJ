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
      <StyledHeader>
        <button onClick={audioHandler.initAudio} disabled={!!audioContext}>
          init
        </button>
        <button onClick={handleAudio} disabled={!audioContext}>
          {isPlaying ? 'pause' : 'play'}
        </button>
        <button onClick={audioHandler.stop} disabled={!audioContext}>
          stop
        </button>
      </StyledHeader>
      {controllers.map(controller => (
        <div style={{ display: 'flex' }} key={controller.config[0].id}>
          {controller.config.map(config => (
            <StyledDiv key={config.id}>
              <div style={{ minWidth: '130px', textAlign: 'right' }}>
                {config.id}
              </div>
              <input
                disabled={!audioContext}
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

const StyledHeader = styled.div`
  height: 42px;
  display: flex;
  padding: 0 16px;
  gap: 12px;
  align-items: center;
  border-bottom: 2px solid #ccc;
  button {
    width: 100px;
    height: 24px;
  }
`
const StyledDiv = styled.div`
  border-bottom: 2px solid #ccc;
  height: 72px;
  flex: 1 1 0;
  display: flex;
  align-items: center;
  padding: 12px;
  gap: 12px;
  input {
    width: 100%;
  }
`
