type Key = 'jwtToken'

export const setItem = (key: Key, value: string) => {
  return localStorage.setItem(key, value)
}

export const getItem = (key: Key) => {
  return localStorage.getItem(key)
}