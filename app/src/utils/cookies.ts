/**
 * Utilitários para gerenciamento de cookies
 */

interface CookieOptions {
  days?: number
  path?: string
  secure?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None'
}

/**
 * Define um cookie
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  const {
    days = 7,
    path = '/',
    secure = false,
    sameSite = 'Lax',
  } = options

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    cookieString += `; expires=${date.toUTCString()}`
  }

  cookieString += `; path=${path}`
  cookieString += `; SameSite=${sameSite}`

  if (secure) {
    cookieString += '; Secure'
  }

  document.cookie = cookieString
}

/**
 * Obtém um cookie pelo nome
 */
export function getCookie(name: string): string | null {
  const nameEQ = encodeURIComponent(name) + '='
  const cookies = document.cookie.split(';')

  for (let cookie of cookies) {
    cookie = cookie.trim()
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length))
    }
  }

  return null
}

/**
 * Remove um cookie
 */
export function removeCookie(name: string, path: string = '/'): void {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`
}

/**
 * Salva um objeto como cookie (JSON stringify)
 */
export function setCookieObject<T>(name: string, value: T, options?: CookieOptions): void {
  const jsonString = JSON.stringify(value)
  setCookie(name, jsonString, options)
}

/**
 * Obtém um objeto de cookie (JSON parse)
 */
export function getCookieObject<T>(name: string): T | null {
  const cookieValue = getCookie(name)
  if (!cookieValue) return null

  try {
    return JSON.parse(cookieValue) as T
  } catch {
    return null
  }
}
