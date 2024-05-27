interface AudioParamDescriptor {
  name: string
  defaultValue?: number
  minValue?: number
  maxValue?: number
  automationRate?: 'a-rate' | 'k-rate'
}

declare module 'audio-worklet' {
  class AudioWorkletProcessor {
    readonly port: MessagePort
    process(
      inputs: Float32Array[][],
      outputs: Float32Array[][],
      parameters: Record<string, Float32Array>,
    ): boolean
    static parameterDescriptors?: AudioParamDescriptor[]
    constructor()
  }

  interface AudioWorkletProcessorConstructor {
    new (): AudioWorkletProcessor
    prototype: AudioWorkletProcessor
  }

  function registerProcessor(
    name: string,
    processorCtor: AudioWorkletProcessorConstructor,
  ): void
}

declare let AudioWorkletProcessor: {
  prototype: import('audio-worklet').AudioWorkletProcessor
  new (): import('audio-worklet').AudioWorkletProcessor
}

declare function registerProcessor(
  name: string,
  processorCtor: import('audio-worklet').AudioWorkletProcessorConstructor,
): void
