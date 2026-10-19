const REQUEST_TIMEOUT_MS = 15_000

export const timedFetch = (url, init = {}) =>
  fetch(url, { ...init, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) })
