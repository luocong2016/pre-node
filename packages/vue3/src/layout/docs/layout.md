```typescript
import type { SlotsType } from "vue"

type CustomSlotsType<T> = SlotsType<T>

const ProLayout = defineComponent({
  // ...

  // 插槽
  slots: Object as CustomSlotsType<{
    header: any
    footer: any
    menu: any
  }>,

  // ...
})
```
