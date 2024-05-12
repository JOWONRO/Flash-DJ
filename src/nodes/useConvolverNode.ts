import useNodeHandler from '@src/hooks/useNodeHandler'
import { NodeReturnType } from '@src/types'

const EXAMPLE_IR = '/src/assets/ir/reverb/1 Halls 01 Large Hall.wav'

const useConvolverNode = (src: string = EXAMPLE_IR): NodeReturnType => {
  const { context, audioNode, handler } = useNodeHandler(async context => {
    const convolver = context.createConvolver()
    const response = await fetch(src)
    const arrayBuffer = await response.arrayBuffer()
    convolver.buffer = await context.decodeAudioData(arrayBuffer)
    return convolver
  })

  return { context, audioNode, handler, controllers: [] }
}

export default useConvolverNode
