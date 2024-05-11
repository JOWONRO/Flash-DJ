import styled from '@emotion/styled'

import Container from './components/Container'
import useAudioSource from './hooks/useAudioSource'
import shadow from './styles/shadow'

/**
 * <시각화 고민>
 *
 * - 블러 효과
 * - 가우시안 효과
 * - 파랑빨강 분리되는 효과
 * - 틸트 효과
 * - 회전하는 효과
 * - 흑백 효과
 * - 글리치 효과
 * - 빛 혼합(막 반짝이는?) 효과
 * - 대비 효과
 * - 스케일 효과
 */

const App = () => {
  const { audioContext, isPlaying, units, unitsHandler, audioHandler } =
    useAudioSource()

  const handleAudio = () => {
    if (isPlaying) {
      audioHandler.pause()
      return
    }
    audioHandler.play()
  }

  return (
    <StyledMain>
      <StyledContainer>
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
          <button onClick={unitsHandler.resetUnits} disabled={!audioContext}>
            reset controllers
          </button>
        </StyledHeader>

        <StyledUnitListWrapper>
          <StyledUnitList>
            {units.map(unit => (
              <StyledUnit key={`unit-${unit.id}`}>
                <div className="label">{unit.id}</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {unit.controllers.map((controller, idx) => (
                    <StyledController
                      key={`controller-${unit.id}-${idx}`}
                      style={{ display: 'flex' }}
                    >
                      {controller.map(
                        controlUnit =>
                          controlUnit.option && (
                            <StyledDiv
                              key={`controlUnit-${controlUnit.option.id}`}
                              style={{ display: 'flex' }}
                            >
                              <div
                                style={{
                                  minWidth: '130px',
                                  textAlign: 'right',
                                }}
                              >
                                {controlUnit.option.id}
                              </div>
                              <input
                                disabled={!audioContext}
                                type="range"
                                id={controlUnit.option.id}
                                min={controlUnit.option.min}
                                max={controlUnit.option.max}
                                step={controlUnit.option.step}
                                value={controlUnit.value}
                                onChange={e =>
                                  controlUnit.handler.onChange(
                                    e.target.valueAsNumber,
                                  )
                                }
                              />
                            </StyledDiv>
                          ),
                      )}
                    </StyledController>
                  ))}
                </div>
              </StyledUnit>
            ))}
          </StyledUnitList>
        </StyledUnitListWrapper>
      </StyledContainer>
    </StyledMain>
  )
}

export default App

const StyledMain = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #eee;
  padding: 36px;
`
const StyledContainer = styled(Container)`
  width: 100%;
  overflow: hidden;
`
const StyledHeader = styled.div`
  height: 42px;
  display: flex;
  padding: 0 16px;
  gap: 12px;
  align-items: center;
  border-bottom: 1px solid #ccc;
  ${shadow.default}
  button {
    padding: 0 12px;
    min-width: 100px;
    height: 24px;
  }
`

const StyledUnitListWrapper = styled.div`
  flex: 1 1 0;
  overflow-y: auto;
`
const StyledUnitList = styled.div``
const StyledUnit = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
  padding: 24px;
  gap: 16px;
  .label {
    font-weight: bold;
  }
`
const StyledController = styled.div``
const StyledDiv = styled.div`
  height: 40px;
  flex: 1 1 0;
  display: flex;
  align-items: center;
  padding: 12px;
  gap: 12px;
  input {
    width: 100%;
  }
`
