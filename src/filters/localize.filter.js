import ru from '../locales/ru.json'
import en from '../locales/en.json'

const locales = {
	'ru-RU': ru,
	'en-US': en
}

export function localizeFilter(key) {
	const locale = localStorage.getItem('locale') ?? 'ru-RU';

	return locales[locale][key] ?? `[Localize Error]: ${key} не найден`;
}