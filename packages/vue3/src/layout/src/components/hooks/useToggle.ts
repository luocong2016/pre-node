import { ref, type Ref, type UnwrapRef } from "vue"

export interface useToggleActions<T> {
  setLeft: () => void
  setRight: () => void
  set: (value: T) => void
  toggle: () => void
}

function useToggle<T = boolean>(): [Ref<boolean>, useToggleActions<T>]
function useToggle<T>(defaultValue: T): [Ref<T>, useToggleActions<T>]
function useToggle<T, U>(
  defaultValue: T,
  reverseValue: U
): [Ref<T> | Ref<U>, useToggleActions<T | U>]
function useToggle<D, R>(defaultValue: D = false as unknown as D, reverseValue?: R) {
  const state = ref<D | R>(defaultValue)

  const reverseValueOrigin = (
    reverseValue === undefined ? !defaultValue : reverseValue
  ) as UnwrapRef<D | R>

  const toggle = () => {
    state.value = (state.value === defaultValue ? reverseValueOrigin : defaultValue) as UnwrapRef<
      D | R
    >
  }

  const set = (value: D | R) => {
    state.value = value as UnwrapRef<D | R>
  }
  const setLeft = () => {
    state.value = defaultValue as UnwrapRef<D>
  }
  const setRight = () => {
    state.value = reverseValueOrigin as UnwrapRef<R>
  }

  return [state, { toggle, set, setLeft, setRight }]
}

export { useToggle }
