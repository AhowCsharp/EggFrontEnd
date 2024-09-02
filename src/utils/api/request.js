import Reaxios from '@0y0/reaxios'
import { dataStore } from '@app/store/index'
const apiPath = 'https://api.n7tzu.org/customer'

function handleResponse(res) {
  if (res?.success !== true) {
    const error = res?.errors || res?.InnerMessage || res
    console.log('Parsing error:', error)
  }
  return res
}

function handleHttpError(res) {
  if (res.response) {
    const { status } = res.response
    if (status === 401) {
      dataStore.logout()
      dataStore.setAlertMessage('登入逾時，請重新登入')
      return
    }
    const error = res.response?.data || res.message || res
    console.log(`${res.request.responseURL} fetch error:`, error)
    throw res
  }
  console.log(`fetch error:`, res)
  throw res
}

export default class Request extends Reaxios {
  static get = (path) => new Request(path, 'GET')
  static post = (path) => new Request(path, 'POST')
  static put = (path) => new Request(path, 'PUT')

  constructor(path, method) {
    super(`${apiPath}${path}`, method)
  }

  then(onFulfill, onReject) {
    return super.then(handleResponse, handleHttpError).then(onFulfill, onReject)
  }
}
