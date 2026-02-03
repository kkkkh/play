<template>
  <div class="tr-table-filter-number">
    <template v-if="condition === 'in'">
      <TrDynamicTags v-if="multiple" v-model="$values" size="small" @show-input="handleShowInput">
        <template #input="{ submit }">
          <ElInputNumber
            ref="tagInput"
            v-model="inputValue"
            clearable
            :controls="false"
            :size="size"
            @blur="() => submit(inputValue)"
            @keyup.enter.native="() => submit(inputValue)"
          />
        </template>
      </TrDynamicTags>

      <ElInputNumber
        v-else
        v-model="singleValue"
        class="tr-table-filter-number__input"
        clearable
        :controls="false"
        :size="size"
      />
    </template>

    <template v-else-if="condition === 'between'">
      <ElInputNumber
        v-model="$values[0]"
        class="tr-table-filter-number__between-input"
        clearable
        :controls="false"
        :size="size"
      />
      -
      <ElInputNumber
        v-model="$values[1]"
        class="tr-table-filter-number__between-input"
        clearable
        :controls="false"
        :size="size"
      />
    </template>

    <template v-else>
      <ElInputNumber
        v-model="$value"
        class="tr-table-filter-number__input"
        clearable
        :controls="false"
        :size="size"
      />
    </template>
  </div>
</template>

<script>
import { InputNumber } from 'element-ui'

import TrDynamicTags from '../../dynamic-tags'
import { getDefaultFilterCondition } from '../utils'

export default {
  name: 'TrTableFilterNumber',
  components: {
    ElInputNumber: InputNumber,
    TrDynamicTags,
  },
  inheritAttrs: false,
  props: {
    condition: {
      type: String,
      default: getDefaultFilterCondition('number'),
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
      type: Number,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      inputValue: null,
    }
  },
  computed: {
    singleValue: {
      get() {
        return this.values?.[0] ?? null
      },
      set(val) {
        this.$emit('update:values', val === null ? [] : [val])
      },
    },
    $values: {
      get() {
        return this.values || []
      },
      set(val) {
        this.$emit('update:values', val)
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
  methods: {
    handleShowInput() {
      this.$nextTick(() => {
        this.$refs.tagInput?.focus()
      })
    },
  },
}
</script>
