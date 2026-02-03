import {
  getDefaultFilterCondition,
  getDefaultFilterValue,
  getDefaultFilterValues,
  getDefaultValueFormat,
} from '../table-filter'

export function getClassNameFunction(baseClassName, userClassName) {
  return function getClassName(...args) {
    const className = typeof userClassName === 'function' ? userClassName(...args) : userClassName

    return [baseClassName, className].filter(Boolean).join(' ')
  }
}

/**
 * 获取表格列的过滤器值类型
 *
 * @param col {ColumnInfo} - 列信息
 *
 * @returns {string}
 */
export function getColumnFilterValueType(col) {
  if (!col) return 'string'

  return col.params?.dataType ?? 'string'
}

/**
 * 获取表格列的过滤值格式
 *
 * @param col {ColumnInfo} - 列信息
 *
 * @returns {string}
 */
export function getColumnFilterValueFormat(col, valueType) {
  if (!col) return getDefaultValueFormat('string')

  return col.params?.dataFormat ?? getDefaultValueFormat(valueType ?? getColumnFilterValueType(col))
}

/**
 * 获取表格列默认的过滤参数
 *
 * @param {*} col - 列信息
 *
 * @returns {object}
 */
export function getColumnDefaultFilterData(col) {
  const valueType = getColumnFilterValueType(col)

  return {
    condition: getDefaultFilterCondition(valueType),
    valueType,
    valueFormat: getColumnFilterValueFormat(col, valueType),
    value: getDefaultFilterValue(valueType),
    values: getDefaultFilterValues(valueType),
  }
}

/**
 * 获取表格列的自定义值选项
 *
 * @param {*} col - 列信息
 *
 * @returns {Array | undefined}
 */
export function getColumnCustomValueOptions(col) {
  if (!col) return null
  if (col.filters === false) return null

  if (col.filterRender?.props?.options) {
    return col.filterRender.props.options
  }
  // debugger

  return typeof col.filters === 'boolean'
    ? null
    : (col.filters?.map(({ label, value }) => ({
        label: String(label),
        value,
      })) ?? null)
}
