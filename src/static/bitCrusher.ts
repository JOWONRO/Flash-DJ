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

class BitCrusherProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors(): AudioParamDescriptor[] {
    return [
      { name: 'bitDepth', defaultValue: 16, minValue: 1, maxValue: 16 },
      { name: 'frequency', defaultValue: 1, minValue: 0.01, maxValue: 1 },
    ]
  }

  private phaser: number
  private last: number

  constructor() {
    super()
    this.phaser = 0
    this.last = 0
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ): boolean {
    const input = inputs[0]
    const output = outputs[0]
    const bitDepth = parameters.bitDepth
    const frequency = parameters.frequency

    for (let channel = 0; channel < output.length; channel++) {
      const inputChannel = input[channel]
      const outputChannel = output[channel]
      if (inputChannel) {
        const step = Math.pow(0.5, bitDepth[0])
        for (let i = 0; i < inputChannel.length; i++) {
          this.phaser += frequency[0]
          if (this.phaser >= 1.0) {
            this.phaser -= 1.0
            this.last = step * Math.floor(inputChannel[i] / step + 0.5)
          }
          outputChannel[i] = this.last
        }
      }
    }

    return true
  }
}

registerProcessor('bit-crusher-processor', BitCrusherProcessor)
