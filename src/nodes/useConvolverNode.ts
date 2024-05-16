import useNodeHandler from '@src/hooks/useNodeHandler'
import { NodeReturnType } from '@src/types'

const useConvolverNode = (irSrc: string): NodeReturnType => {
  const { context, audioNode, handler } = useNodeHandler(async context => {
    const convolver = context.createConvolver()
    const response = await fetch(irSrc)
    const arrayBuffer = await response.arrayBuffer()
    convolver.buffer = await context.decodeAudioData(arrayBuffer)
    return convolver
  })

  return { context, audioNode, handler, controllers: [] }
}

export default useConvolverNode
