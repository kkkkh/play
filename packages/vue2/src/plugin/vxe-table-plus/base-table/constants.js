// @ts-check

/** @type {string} */
export const BaseFilterRenderName = 'baseFilter'

/** @type {{ label: string, value: string }[]} */
export const FilterOptions = [
  { label: 'tr.baseTable.eq', value: 'eq' },
  { label: 'tr.baseTable.include', value: 'include' },
  { label: 'tr.baseTable.isEmpty', value: 'isEmpty' },
  { label: 'tr.baseTable.isNotEmpty', value: 'isNotEmpty' },
  { label: 'tr.tableFilter.in', value: 'in' },
]

/** @type {{ label: string, value: string }[]} */
export const SortOptions = [
  { label: 'tr.baseTable.asc', value: 'asc' },
  { label: 'tr.baseTable.desc', value: 'desc' },
]

/**
 * @template T
 * @typedef {{ [K in keyof T as string extends K ? never : K]: T[K] }} OmitStringIndex<T>
 */

/**
 * @template T
 * @typedef {{ [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never; }[keyof T]} PickFunctionKeys<T>
 */

/** @type {PickFunctionKeys<OmitStringIndex<import("vxe-table").VxeTable>>[]} */
export const ExtendMethods = [
  'getCheckboxRecords',
  'getCheckboxReserveRecords',
  // @ts-ignore
  'getCheckedFilters',
  'getColumnByField',
  'getRadioRecord',
  // @ts-ignore
  'getSortColumns',
  'refreshColumn',
  'setRadioRow',
  'sort',
  'clearSort',
  'toggleAllCheckboxRow',
  'toggleCheckboxRow',
  'updateData',
]
