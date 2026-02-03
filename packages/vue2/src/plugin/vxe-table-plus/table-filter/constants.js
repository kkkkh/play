export const FilterOptions = [
  { label: '等于', value: 'eq' },
  { label: '小于', value: 'lt' },
  { label: '小于等于', value: 'lte' },
  { label: '大于', value: 'gt' },
  { label: '大于等于', value: 'gte' },
  { label: '介于', value: 'between' },
  { label: '包含', value: 'include' },
  { label: '为空', value: 'isEmpty' },
  { label: '不为空', value: 'isNotEmpty' },
  { label: '属于', value: 'in' },
]

export const defaultConditions = {
  string: ['eq', 'include', 'isEmpty', 'isNotEmpty', 'in'],
  number: ['eq', 'lt', 'lte', 'gt', 'gte', 'between', 'isEmpty', 'isNotEmpty', 'in'],
  date: ['eq', 'lt', 'lte', 'gt', 'gte', 'between', 'isEmpty', 'isNotEmpty'],
  time: ['eq', 'between', 'isEmpty', 'isNotEmpty'],
  datetime: ['eq', 'lt', 'lte', 'gt', 'gte', 'between', 'isEmpty', 'isNotEmpty'],
}

export const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd'

export const DEFAULT_TIME_FORMAT = 'HH:mm:ss'

export const DEFAULT_DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss'
