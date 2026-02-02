<template>
  <div class="tr-table-filter-datetime">
    <template v-if="condition === 'in'">
      <TrDynamicTags v-if="multiple" v-model="$values" size="small" @show-input="handleShowInput">
        <template #input="{ submit }">
          <ElDatePicker
            ref="tagInput"
            v-model="inputValue"
            :append-to-body="false"
            clearable
            :format="valueFormat"
            :size="size"
            type="datetime"
            :value-format="valueFormat"
            @blur="() => submit(inputValue)"
            @keyup.enter.native="() => submit(inputValue)"
          />
        </template>
      </TrDynamicTags>

      <ElDatePicker
        v-else
        v-model="singleValue"
        :append-to-body="false"
        class="tr-table-filter-datetime__input"
        clearable
        :format="valueFormat"
        :size="size"
        type="datetime"
        :value-format="valueFormat"
      />
    </template>

    <template v-else-if="condition === 'between'">
      <ElDatePicker
        v-model="$values"
        :append-to-body="false"
        class="tr-table-filter-datetime__range-input"
        clearable
        format="yy/M/d H:m:s"
        :size="size"
        type="datetimerange"
        :value-format="valueFormat"
      />
    </template>

    <template v-else>
      <ElDatePicker
        v-model="$value"
        :append-to-body="false"
        class="tr-table-filter-datetime__input"
        clearable
        :format="valueFormat"
        :size="size"
        type="datetime"
        :value-format="valueFormat"
      />
    </template>
  </div>
</template>

<script>
import { DatePicker } from 'element-ui'

import TrDynamicTags from '../../dynamic-tags'
import { getDefaultFilterCondition, getDefaultValueFormat } from '../utils'

export default {
  name: 'TrTableFilterDateTime',
  components: {
    ElDatePicker: DatePicker,
    TrDynamicTags,
  },
  inheritAttrs: false,
  props: {
    condition: {
      type: String,
      default: getDefaultFilterCondition('datetime'),
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'small',
      validator: (value) => ['mini', 'small', 'large'].includes(value),
    },
    valueFormat: {
      type: String,
      default: getDefaultValueFormat('datetime'),
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
        this.$emit('update:values', val ? [val] : [])
      },
    },
    $values: {
      get() {
        return this.values
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
