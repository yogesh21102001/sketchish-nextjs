import qs from 'query-string'

export const URL_REGEXP = /(((https?:\/\/)|(www\.))[^\s]+)/g

export function stringifyURL(url, query, deep) {
  return `${url}?${deep ? stringifyDeep(query) : qs.stringify(query)}`
}

export function stringifyQuery(query) {
  return qs.stringify(query)
}

export function parseUrl(url, deep) {
  const parsedUrl = qs.parseUrl(url)
  if (!deep) {
    return parsedUrl
  }
  const query = qs.extract(url)
  return {
    url: parsedUrl.url,
    query: parseDeep(query),
  }
}
function parseDeepFeed(query) {
  const parsedParams = qs.parse(query, {
    parseNumbers: false,
    arrayFormat: 'bracket',
    parseBooleans: true,
  })

  Object.keys(parsedParams).forEach((key) => {
    if (typeof parsedParams[key] === 'string' && parsedParams[key].includes('=')) {
      parsedParams[key] = parseDeepFeed(parsedParams[key])
    }
  })

  return parsedParams
}
export function parseUrlFeed(url, deep) {
  const parsedUrl = qs.parseUrl(url)
  if (!deep) {
    return parsedUrl
  }
  const query = qs.extract(url)
  return {
    url: parsedUrl.url,
    query: parseDeepFeed(query),
  }
}

export function parseQuery(query) {
  return qs.parse(query)
}

export function linkify(string = '') {
  try {
    return string.replace(URL_REGEXP, (e, b, c) => {
      const href = c === 'www.' ? `https://${e}` : e
      return `<a href="${href}" target="_blank">${e}</a>`
    })
  } catch (e) {
    console.error(e)
    return ''
  }
}

function stringifyDeep(params) {
  const stringifyParams = {}

  Object.keys(params).forEach((key) => {
    if (typeof params[key] === 'object' && !Array.isArray(params[key])) {
      stringifyParams[key] = stringifyDeep(params[key])
    } else {
      stringifyParams[key] = params[key]
    }
  })

  return qs.stringify(stringifyParams, { arrayFormat: 'bracket' })
}

function parseDeep(query) {
  const parsedParams = qs.parse(query, {
    parseNumbers: true,
    arrayFormat: 'bracket',
  })

  Object.keys(parsedParams).forEach((key) => {
    if (typeof parsedParams[key] === 'string' && parsedParams[key].includes('=')) {
      parsedParams[key] = parseDeep(parsedParams[key])
    }
  })

  return parsedParams
}
