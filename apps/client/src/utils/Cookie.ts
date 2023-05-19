export const saveToCookie = (
  cookieName: string,
  cookieValue: string | Object,
): void => {
  document.cookie = `${cookieName}=${JSON.stringify(cookieValue)}`
}
export const deleteCookie = (cookieName: string): void => {
  document.cookie = `${cookieName}=`
}
export const readCookie = (cookieName: string): string => {
  const cookies = document.cookie.split(';')
  let formCookie: string = ''
  cookies.forEach(cookie => {
    if (cookie.startsWith(`${cookieName}=`)) {
      formCookie = cookie.replace(`${cookieName}=`, '')
    }
  })
  return formCookie
}
