<template>
  <div class="tr-table-filter-time">
    <template v-if="condition === 'in'">
      <TrDynamicTags v-if="multiple" v-model="$values" size="small" @show-input="handleShowInput">
        <template #input="{ submit }">
          <ElTimePicker
            ref="tagInput"
            v-model="inputValue"
            :append-to-body="false"
            class="tr-table-filter-time__multiple-input"
            clearable
            :size="size"
            :value-format="valueFormat"
            @blur="() => submit(inputValue)"
            @keyup.enter.native="() => submit(inputValue)"
          />
        </template>
      </TrDynamicTags>

      <ElTimePicker
        v-else
        v-model="singleValue"
        :append-to-body="false"
        class="tr-table-filter-time__input"
        clearable
        :size="size"
        :value-format="valueFormat"
      />
    </template>

    <template v-else-if="condition === 'between'">
      <ElTimePicker
        v-model="$values[0]"
        :append-to-body="false"
        class="tr-table-filter-time__range-input"
        clearable
        :size="size"
        :value-format="valueFormat"
      />
      -
      <ElTimePicker
        v-model="$values[1]"
        :append-to-body="false"
        class="tr-table-filter-time__range-input"
        clearable
        :size="size"
        :value-format="valueFormat"
      />
    </template>

    <template v-else>
      <ElTimePicker
        v-model="$value"
        :append-to-body="false"
        class="tr-table-filter-time__input"
        clearable
        :size="size"
        :value-format="valueFormat"
      />
    </template>
  </div>
</template>

<script>
import { TimePicker } from 'element-ui'

import TrDynamicTags from '../../dynamic-tags'
import { getDefaultFilterCondition, getDefaultValueFormat } from '../utils'

export default {
  name: 'TrTableFilterTime',
  components: {
    ElTimePicker: TimePicker,
    TrDynamicTags,
  },
  inheritAttrs: false,
  props: {
    condition: {
      type: String,
      default: getDefaultFilterCondition('time'),
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
    valueFormat: {
      type: String,
      default: getDefaultValueFormat('time'),
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
        this.$emit('update:value', val ? [val] : [])
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
