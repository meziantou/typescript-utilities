export function throttle(wait: number, func: (...args: any[]) => any, immediate: boolean = false) {
	let context: any;
	let args: IArguments;
	let timeout: number | null = null;
	let result: any;
	var previous: any = 0;
	var later = () => {
		previous = new Date;
		timeout = null;
		result = func.apply(context, args);
	};
	return function (this: any, ...args: any[]) {
		var now = new Date();
		if (!previous && immediate === false) {
			previous = now;
		}

		var remaining = wait - (now.getTime() - previous);
		context = this;
		if (remaining <= 0) {
			if (timeout !== null) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
		} else if (!timeout) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
};
