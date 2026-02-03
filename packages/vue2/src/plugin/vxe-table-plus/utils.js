export function isUndef(obj) {
  return obj === undefined
}

export function isNull(obj) {
  return obj === null
}

export function isUndefOrNull(obj) {
  return isUndef(obj) || isNull(obj)
}

export function isEmpty(str) {
  return isUndefOrNull(str) || String(str) === ''
}
