import { useState } from 'react'

import { ControllerOption } from '../types'

const useController = (
  onChange: (value: number) => void,
  option?: ControllerOption,
) => {
  const [value, setValue] = useState(option?.defaultValue)

  const handler = {
    onChange: (value: number) => {
      onChange(value)
      setValue(value)
    },
    reset: () => {
      setValue(option?.defaultValue)
    },
  }

  return {
    value,
    handler,
    option,
  }
}

export default useController
