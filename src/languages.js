import { KNOWN_LANGUAGES, KNOWN_LANGUAGE_CODES } from './config.js'

export const langPathRegex = /\/([a-z]{2}-?[A-Z]{0,2})\//

/**
 * 
 * @param {string} pathname
 * @returns {string}
 */
export function getLanguageFromURL(pathname) {
	const langCodeMatch = pathname.match(langPathRegex)
	const langCode = langCodeMatch ? langCodeMatch[1] : 'zh'
	return langCode
}
