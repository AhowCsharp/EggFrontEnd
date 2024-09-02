export function marginVertical(value) {
  return `margin-top:${value};margin-bottom:${value};`
}

export function marginHorizontal(value) {
  return `margin-right:${value};margin-left:${value};`
}

export function paddingVertical(value) {
  return `padding-top:${value};padding-bottom:${value};`
}

export function paddingHorizontal(value) {
  return `padding-right:${value};padding-left:${value};`
}

export function gapVertical(value) {
  return `>*+*{margin-top:${value};};`
}

export function gapHorizontal(value) {
  return `>*+*{margin-left:${value};};`
}

export function firstNChild(value) {
  return `&:nth-child(-n + ${value})`
}

export function lastNChild(value) {
  return `&:nth-last-child(-n + ${value})`
}

export const notFirstChild = '&:not(:first-child)'
