import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'

countries.registerLocale(enLocale)

export const lowerCase = (str: string) => {
  return str.toLowerCase()
}

export const firstLetterUppercase = (str: string) => {
  const valueString = lowerCase(`${str}`)
  return `${valueString.charAt(0).toUpperCase()}${valueString.slice(1).toLowerCase()}`
}

export const replaceSpacesWithDash = (title: string) => {
  const lowercaseTitle: string = lowerCase(`${title}`)
  return lowercaseTitle.replace(/\/| /g, '-') // replace / and space with -
}

export const replaceDashWithSpaces = (title: string) => {
  const lowercaseTitle: string = lowerCase(`${title}`)
  return lowercaseTitle.replace(/-|\/| /g, ' ') // replace - / and space with -
}

export const replaceAmpersandWithSpace = (title: string) => {
  return title.replace(/&/g, '')
}

export const replaceAmpersandAndDashWithSpace = (title: string) => {
  const titleWithoutDash = replaceDashWithSpaces(title)
  return titleWithoutDash.replace(/&| /g, ' ')
}

export const categories = (): string[] => {
  return [
    'Graphics & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Video & Animation',
    'Music & Audio',
    'Programming & Tech',
    'Photography',
    'Data',
    'Business'
  ]
}

export const countriesList = (): string[] => {
  const countriesObj = countries.getNames('en', { select: 'official' })
  return Object.values(countriesObj)
}
