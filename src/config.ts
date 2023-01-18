export const SITE = {
	title: 'Documentation',
	description: 'Your website description.',
	defaultLanguage: 'zh_CN',
}

export const OPEN_GRAPH = {
	image: {
		src: 'https://github.com/withastro/astro/blob/main/assets/social/banner-minimal.png?raw=true',
		alt:
			'astro logo on a starry expanse of space,' +
			' with a purple saturn-like planet floating in the right foreground',
	}
}

// This is the type of the frontmatter you put in the docs markdown files.
export type Frontmatter = {
	title: string
	description: string
	layout: string
	image?: { src: string; alt: string }
	dir?: 'ltr' | 'rtl'
	ogLocale?: string
	lang?: string
}

export const KNOWN_LANGUAGES = {
	Chinese: 'zh'
} as const
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES)

export const GITHUB_EDIT_URL = `https://github.com/javascriptfield/docs/edit/master`

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
	indexName: 'XXXXXXXXXX',
	appId: 'XXXXXXXXXX',
	apiKey: 'XXXXXXXXXX',
}

export type Sidebar = Record<
	(typeof KNOWN_LANGUAGE_CODES)[number],
	Record<string, { text: string; link: string }[]>
>

export const SIDEBAR: Sidebar = {
	zh: {
		'Introduction': [{ text: 'Introduction', link: 'docs/zh/Introduction/introduction'}]
	},
}
const files = import.meta.glob('./pages/zh/**')
for (let i in files) {
	const category = i.substring(11, i.lastIndexOf('/'))
	if(category == 'Introduction') continue
	const fileName = i.replace(/.\/pages\/zh\/.*\//, '').replace(/.md/, '')
	if (!SIDEBAR.zh[category]) {
		SIDEBAR.zh[category] = []
	}
	SIDEBAR.zh[category].push({ text: fileName, link: `docs/zh/${category}/${fileName}` })
}
