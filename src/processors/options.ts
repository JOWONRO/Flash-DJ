export const bitCrusherOptions = {
  bitDepth: { name: 'bitDepth', defaultValue: 16, minValue: 1, maxValue: 16 },
  frequency: {
    name: 'frequency',
    defaultValue: 1,
    minValue: 0.01,
    maxValue: 1,
  },
}

export const slicerOptions = {
  frequency: { name: 'frequency', defaultValue: 0, maxValue: 20, minValue: 0 },
  depth: { name: 'depth', defaultValue: 0, maxValue: 1, minValue: 0 },
}
export const tremoloOptions = {
  frequency: { name: 'frequency', defaultValue: 0, maxValue: 20, minValue: 0 },
  depth: { name: 'depth', defaultValue: 0, maxValue: 1, minValue: 0 },
}

export const phaserOptions = {
  rate: { name: 'rate', defaultValue: 0, minValue: 0, maxValue: 10 },
  depth: { name: 'depth', defaultValue: 0, minValue: 0, maxValue: 1 },
  feedback: { name: 'feedback', defaultValue: 0, minValue: 0, maxValue: 1 },
}
