import { persistentMap } from '@nanostores/persistent'

export type SettingsValue = {
  sidebar: 'show' | 'hide',
  theme: 'dark' | 'light'
}

export const settings = persistentMap<SettingsValue>('settings:', {
  sidebar: 'show',
  theme: 'light'
})