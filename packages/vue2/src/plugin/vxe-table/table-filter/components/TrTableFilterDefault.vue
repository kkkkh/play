<template>
  <div class="tr-table-filter-default">
    <template v-if="condition === 'in'">
      <ElSelect
        v-model="$values"
        allow-create
        class="tr-table-filter-default__input"
        clearable
        default-first-option
        filterable
        multiple
        :popper-append-to-body="false"
        :size="size"
      >
        <ElOption
          v-for="option in valueOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </ElSelect>
    </template>

    <template v-else>
      <ElInput v-model="$value" class="tr-table-filter-default__input" clearable :size="size" />
    </template>
  </div>
</template>

<script>
import { Input, Option, Select } from 'element-ui'

import { getDefaultFilterCondition } from '../utils'

export default {
  name: 'TrTableFilterDefault',
  components: {
    ElSelect: Select,
    ElInput: Input,
    ElOption: Option,
  },
  inheritAttrs: false,
  props: {
    condition: {
      type: String,
      default: getDefaultFilterCondition('string'),
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'small',
      validator: (value) => ['mini', 'small', 'medium'].includes(value),
    },
    valueOptions: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
  },
  computed: {
    $values: {
      get() {
        return this.values || []
      },
      set(val) {
        this.$emit('update:values', val)
      },
    },
    singleValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('update:value', val)
      },
    },
    $value: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('update:value', val)
      },
    },
  },
}
</script>
