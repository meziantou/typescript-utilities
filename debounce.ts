export function debounce(wait: number, func: (...args: any[]) => any, immediate: boolean = false): (...args: any[]) => any {
	let timeout: number | null = null;
	let result: any;
	return function (this: any, ...args: any[]) {
		var context = this;
		var later = () => {
			timeout = null;
			if (!immediate) {
				result = func.apply(this, args);
			}
		};
		var callNow = immediate && !timeout;
		if (timeout !== null) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(later, wait);
		if (callNow) {
			result = func.apply(context, args);
		}
		return result;
	};
};
