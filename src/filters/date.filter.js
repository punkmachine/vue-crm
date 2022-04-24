export function dateFilter(value, format = 'date') {
	let options = {};
	const locale = localStorage.getItem('locale') ?? 'ru-RU'

	if (format.includes('date')) {
		options.day = '2-digit';
		options.month = 'long';
		options.year = 'numeric';
	}

	if (format.includes('time')) {
		options.hour = '2-digit';
		options.minute = '2-digit';
		options.second = '2-digit';
	}

	return new Intl.DateTimeFormat(locale, options).format(value);
}
