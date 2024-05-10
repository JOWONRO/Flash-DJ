import useNodeHandler from '@src/hooks/useNodeHandler'
import { NodeReturnType } from '@src/types'

const EXAMPLE_IR =
  '/src/assets/ir/M7 - 1 Halls 01 Large Hall/1 Halls 01 Large Hall  M-to-S.wav'

const useConvolverNode = (): NodeReturnType => {
  const { audioNode, handler } = useNodeHandler(async context => {
    const convolver = context.createConvolver()
    const response = await fetch(EXAMPLE_IR)
    const arrayBuffer = await response.arrayBuffer()
    convolver.buffer = await context.decodeAudioData(arrayBuffer)
    return convolver
  })

  return { audioNode, handler, controllers: [] }
}

export default useConvolverNode
