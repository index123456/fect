import { createNameSpace, useProvider } from '../utils'
import { computed, watchEffect, ref } from 'vue'
import './tab.less'

const [createComponent] = createNameSpace('Tab')

const READONLY_TABS_KEY = 'tabsKey'

export default createComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    disabled: Boolean,
  },
  setup(props, { attrs, slots, emit }) {
    const { ctx, idx } = useProvider(READONLY_TABS_KEY)
    const selfIndex = ref(props.value)

    /**
     * it will  use index of components while value is empty
     */
    watchEffect(() => {
      if (selfIndex.value === '') return (selfIndex.value = idx)
    })

    // console.log(props.disabled)

    const isDisabled = computed(() => {
      return ctx.currentChecked.value === selfIndex.value ? '' : 'none'
    })

    return () => (
      <>
        <div class={`fect-tab_wrapper ${isDisabled.value}`}>
          {slots.default?.()}
        </div>
      </>
    )
  },
})
