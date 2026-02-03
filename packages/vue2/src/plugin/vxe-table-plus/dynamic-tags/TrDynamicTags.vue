<template>
  <div class="tr-dynamic-tags">
    <ElTag
      v-for="(item, index) in value"
      :key="item"
      class="tr-dynamic-tags__item"
      closable
      disable-transitions
      :size="size"
      @close="handleDeleteTag(index)"
    >
      <slot :item="item">
        {{ item }}
      </slot>
    </ElTag>

    <div v-if="showInput" class="tr-dynamic-tags__input">
      <slot name="input" :submit="submitInput">
        <ElInput
          ref="tagInput"
          v-model="inputValue"
          clearable
          :size="inputSize"
          @keyup.enter.native="() => submitInput(inputValue)"
        />
      </slot>
    </div>

    <ElButton
      v-else
      circle
      class="tr-dynamic-tags__btn"
      icon="el-icon-plus"
      :size="inputSize"
      @click="handleAddClick"
    />
  </div>
</template>

<script>
import { isEmpty } from '../utils'
import { Button, Input, Tag } from 'element-ui'

export default {
  name: 'TrDynamicTags',
  components: {
    ElTag: Tag,
    ElInput: Input,
    ElButton: Button,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: 'small',
      validator: (value) => ['mini', 'small', 'medium'].includes(value),
    },
  },
  data() {
    return {
      showInput: false,
      inputValue: null,
    }
  },
  computed: {
    inputSize() {
      switch (this.size) {
        case 'mini':
        case 'small': {
          return 'mini'
        }
        case 'medium': {
          return 'small'
        }

        default: {
          return this.size
        }
      }
    },
    hasInputSlot() {
      return !!(this.$slots.input || this.$scopedSlots.input)
    },
  },
  methods: {
    handleAddClick() {
      this.showInput = true

      if (!this.hasInputSlot) {
        this.$nextTick(() => {
          this.$refs.tagInput?.focus()
        })
      }

      this.$emit('show-input')
    },
    submitInput(v) {
      if (!isEmpty(v) && !this.value?.includes(v)) {
        this.$emit('change', [...this.value, v])
      }

      this.inputValue = null
      this.showInput = false

      this.$emit('hide-input')
    },
    handleDeleteTag(index) {
      const newValue = [...this.value]

      newValue.splice(index, 1)

      this.$emit('change', newValue)
    },
  },
}
</script>

<style lang="scss">
@use './dynamic-tags.scss' as *;
</style>
