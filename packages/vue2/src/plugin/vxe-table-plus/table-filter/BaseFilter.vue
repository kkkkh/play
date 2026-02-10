<template>
  <div class="tr-table-filter">
    <div
      class="tr-table-filter__condition"
      :class="{
        'is-error': conditionStatus,
      }"
    >
      <ElSelect
        v-model="$condition"
        :popper-append-to-body="false"
        :size="size"
        @change="handleConditionChange"
      >
        <ElOption
          v-for="option in conditionOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </ElSelect>
    </div>
    <div
      class="tr-table-filter__value"
      :class="{
        'is-error': valueStatus,
      }"
    >
      <component
        :is="filterComponent"
        v-if="!shouldHideValue"
        :condition="$condition"
        :multiple="multiple"
        :size="size"
        :value.sync="$value"
        :value-format="valueFormat"
        :value-options="valueOptions"
        :values.sync="$values"
      />
    </div>
  </div>
</template>

<script>
import { Option, Select } from 'element-ui'

import TrTableFilterCustom from './components/TrTableFilterCustom.vue'
import TrTableFilterDate from './components/TrTableFilterDate.vue'
import TrTableFilterDateTime from './components/TrTableFilterDateTime.vue'
import TrTableFilterDefault from './components/TrTableFilterDefault.vue'
import TrTableFilterNumber from './components/TrTableFilterNumber.vue'
import TrTableFilterTime from './components/TrTableFilterTime.vue'
import { defaultConditions, FilterOptions } from './constants'
import {
  getDefaultFilterCondition,
  getDefaultFilterValue,
  getDefaultFilterValues,
  validateFilterData,
} from './utils'

export default {
  name: 'TrTableFilter',
  components: {
    ElSelect: Select,
    ElOption: Option,
  },
  props: {
    size: {
      type: String,
      default: 'small',
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    valueType: {
      type: String,
      default: 'string',
    },
    valueFormat: {
      type: String,
      default: undefined,
    },
    valueOptions: {
      type: Array,
      default: () => [],
    },
    isCustomOptions: {
      type: Boolean,
      default: false,
    },
    excludeConditions: {
      type: [Array, Function],
      default: () => [],
    },
    includeConditions: {
      type: [Array, Function],
      default: () => [],
    },
    condition: {
      type: String,
      default: getDefaultFilterCondition('string'),
    },
    value: {
      type: [String, Number],
      default: getDefaultFilterValue('string'),
    },
    values: {
      type: Array,
      default: () => getDefaultFilterValues('string'),
    },
  },
  data() {
    return {
      conditionStatus: false,
      valueStatus: false,
    }
  },
  computed: {
    $condition: {
      get() {
        return this.condition
      },
      set(value) {
        this.$emit('update:condition', value)
      },
    },
    $value: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update:value', value)
      },
    },
    $values: {
      get() {
        return this.values
      },
      set(value) {
        this.$emit('update:values', value)
      },
    },
    shouldHideValue() {
      if (!this.condition) return true

      return ['isEmpty', 'isNotEmpty'].includes(this.condition)
    },
    // #region filterComponent
    filterComponent() {
      if (this.isCustomOptions) {
        return TrTableFilterCustom
      }

      switch (this.valueType) {
        case 'date': {
          return TrTableFilterDate
        }
        case 'time': {
          return TrTableFilterTime
        }
        case 'datetime': {
          return TrTableFilterDateTime
        }
        case 'number': {
          return TrTableFilterNumber
        }
        default: {
          return TrTableFilterDefault
        }
      }
    },
    // #endregion filterComponent
    defaultConditionOptions() {
      return FilterOptions.map((item) => ({
        label: item.label,
        value: item.value,
      }))
    },
    conditionOptions() {
      const includeConditions =
        typeof this.includeConditions === 'function'
          ? this.includeConditions()
          : this.includeConditions

      if (includeConditions?.length) {
        return this.defaultConditionOptions.filter((item) => includeConditions.includes(item.value))
      }

      const excludeConditions =
        typeof this.excludeConditions === 'function'
          ? this.excludeConditions()
          : this.excludeConditions
      // #region condition
      const conditions = defaultConditions[this.valueType ?? 'default'] ?? []
      // #endregion condition

      return conditions
        .filter((item) => !excludeConditions?.includes(item))
        .map((item) => this.defaultConditionOptions.find((option) => option.value === item))
        .filter(Boolean)
    },
  },
  methods: {
    handleConditionChange(condition) {
      switch (condition) {
        case 'isEmpty':
        case 'isNotEmpty': {
          this.$value = null
          this.$values = null
          break
        }
        default: {
          this.$value = getDefaultFilterValue(this.valueType, this.valueFormat)
          this.$values = getDefaultFilterValues(this.valueType, this.valueFormat)
        }
      }

      this.conditionStatus = false
      this.valueStatus = false
    },
    validateCondition() {
      if (!this.$condition) {
        this.conditionStatus = true

        return Promise.reject(new Error("Filter condition can't be empty"))
      }

      this.conditionStatus = false

      return Promise.resolve()
    },
    validateValue() {
      const isValid = validateFilterData({
        condition: this.$condition,
        value: this.$value,
        values: this.$values,
      })

      if (!isValid) {
        this.valueStatus = true

        return Promise.reject(new Error("Filter value can't be empty"))
      }

      this.valueStatus = false

      return Promise.resolve()
    },
    async validate() {
      await Promise.all([this.validateCondition(), this.validateValue()])
    },
  },
}
</script>

<style lang="scss">
@use './base-filter.scss' as *;
</style>
