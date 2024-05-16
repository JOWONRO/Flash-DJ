export interface DistortionCurve {
  option: {
    id: string
    min: number
    max: number
    step: number
    defaultValue: number
  }
  getCurve: (amount: number) => Float32Array
}

const NUM_SAMPLES = 44100

const softClipping: DistortionCurve = {
  option: {
    id: 'amount',
    min: 0.1,
    max: 1,
    step: 0.01,
    defaultValue: 1,
  },
  getCurve: (amount: number) => {
    const curve = new Float32Array(NUM_SAMPLES)
    for (let i = 0; i < NUM_SAMPLES; ++i) {
      const x = (i * 2) / NUM_SAMPLES - 1
      curve[i] = x < -amount ? -amount : x > amount ? amount : x
    }
    return curve
  },
}

const softAndHardClipping: DistortionCurve = {
  option: {
    id: 'amount',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 0,
  },
  getCurve: (amount: number) => {
    const curve = new Float32Array(NUM_SAMPLES)
    const deg = Math.PI / 180
    for (let i = 0; i < NUM_SAMPLES; ++i) {
      const x = (i * 2) / NUM_SAMPLES - 1
      curve[i] =
        ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x))
    }
    return curve
  },
}

const hardClipping: DistortionCurve = {
  option: {
    id: 'threshold',
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 1,
  },
  getCurve: (threshold: number) => {
    const curve = new Float32Array(NUM_SAMPLES)
    for (let i = 0; i < NUM_SAMPLES; ++i) {
      const x = (i * 2) / NUM_SAMPLES - 1
      curve[i] = Math.max(-threshold, Math.min(threshold, x))
    }
    return curve
  },
}

const overdrive: DistortionCurve = {
  option: {
    id: 'amount',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 0,
  },
  getCurve: (amount: number) => {
    const curve = new Float32Array(NUM_SAMPLES)
    const k = amount
    for (let i = 0; i < NUM_SAMPLES; ++i) {
      const x = (i * 2) / NUM_SAMPLES - 1
      curve[i] = ((1 + k) * x) / (1 + k * Math.abs(x))
    }
    return curve
  },
}

const tangentBase: DistortionCurve = {
  option: {
    id: 'amount',
    min: 1,
    max: 20,
    step: 0.1,
    defaultValue: 1,
  },
  getCurve: (amount: number) => {
    const curve = new Float32Array(NUM_SAMPLES)
    for (let i = 0; i < NUM_SAMPLES; ++i) {
      const x = (i * 2) / NUM_SAMPLES - 1
      curve[i] = Math.tanh(amount * x)
    }
    return curve
  },
}

export const distortionCurves = {
  softClipping,
  softAndHardClipping,
  hardClipping,
  overdrive,
  tangentBase,
}
