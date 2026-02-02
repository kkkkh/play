<template>
  <div class="tr-table-filter-default">
    <template v-if="condition === 'eq'">
      <ElSelect
        v-model="singleValue"
        class="tr-table-filter-default__input"
        clearable
        filterable
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
      <ElSelect
        v-model="$values"
        class="tr-table-filter-default__input"
        clearable
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
  </div>
</template>

<script>
import { Option, Select } from 'element-ui'

export default {
  name: 'TrTableFilterCustom',
  components: {
    ElSelect: Select,
    ElOption: Option,
  },
  inheritAttrs: false,
  props: {
    condition: {
      type: String,
      default: 'include',
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
