import { phaserOptions } from './options'

class PhaserProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors(): AudioParamDescriptor[] {
    return [phaserOptions.rate, phaserOptions.depth, phaserOptions.feedback]
  }

  private phase: number
  private feedbackSample: number
  private sampleRate: number

  constructor() {
    super()
    this.phase = 0
    this.feedbackSample = 0
    this.sampleRate = 44100

    this.port.onmessage = event => {
      if (event.data.sampleRate) {
        this.sampleRate = event.data.sampleRate
      }
    }
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ) {
    const input = inputs[0]
    const output = outputs[0]
    const rate = parameters.rate
    const depth = parameters.depth
    const feedback = parameters.feedback

    for (let channel = 0; channel < input.length; channel++) {
      const inputChannel = input[channel]
      const outputChannel = output[channel]

      for (let i = 0; i < inputChannel.length; i++) {
        const currentRate = rate.length > 1 ? rate[i] : rate[0]
        const currentDepth = depth.length > 1 ? depth[i] : depth[0]
        const currentFeedback = feedback.length > 1 ? feedback[i] : feedback[0]

        if (currentRate === 0 && currentDepth === 0 && currentFeedback === 0) {
          outputChannel[i] = inputChannel[i]
        } else {
          this.phase += currentRate / this.sampleRate
          if (this.phase >= 1.0) this.phase -= 1.0

          const modulator =
            1 - currentDepth + currentDepth * Math.sin(2 * Math.PI * this.phase)
          const delayedSample =
            inputChannel[i] * modulator + this.feedbackSample * currentFeedback
          outputChannel[i] = inputChannel[i] + delayedSample

          this.feedbackSample = delayedSample
        }
      }
    }

    return true
  }
}

registerProcessor('phaser-processor', PhaserProcessor)
