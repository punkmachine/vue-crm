import M from 'materialize-css';

export default {
	bind(el, { value }) {
		M.Tooltip.init(el, { html: value, position: 'top' });
	},
	unbind(el) {
		const elem = M.Tooltip.getInstance(el);

		if (elem?.destroy) {
			elem.destroy();
		}
	}
}