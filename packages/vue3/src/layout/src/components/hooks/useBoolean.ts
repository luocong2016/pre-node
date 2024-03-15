import { type Ref } from "vue"
import { useToggle } from "./useToggle"

export interface useBooleanActions {
  setTrue: () => void
  setFalse: () => void
  set: (value: boolean) => void
  toggle: () => void
}

export function useBoolean(defaultValue = false): [Ref<boolean>, useBooleanActions] {
  const [state, { toggle, set }] = useToggle(defaultValue)

  const setTrue = () => set(true)
  const setFalse = () => set(false)

  return [
    state,
    {
      toggle,
      set: (v) => set(!!v),
      setTrue,
      setFalse,
    },
  ]
}
