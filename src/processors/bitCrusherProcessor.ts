import { bitCrusherOptions } from './options'

class BitCrusherProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors(): AudioParamDescriptor[] {
    return [bitCrusherOptions.bitDepth, bitCrusherOptions.frequency]
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
      if (!inputChannel) break
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

    return true
  }
}

registerProcessor('bit-crusher-processor', BitCrusherProcessor)
