import { makeObservable } from 'mobx'

function makeBinding(self) {
  const keys = new Set()

  let o = Reflect.getPrototypeOf(self)
  while (o !== Object.prototype) {
    for (const key of Reflect.ownKeys(o)) keys.add(key)
    o = Reflect.getPrototypeOf(o)
  }

  for (const key of keys) {
    if (key !== 'constructor' && typeof self[key] === 'function') {
      self[key] = self[key].bind(self)
    }
  }
}

export default function store(Class) {
  return class extends Class {
    constructor() {
      super()
      makeObservable(this)
      makeBinding(this)
    }
  }
}
