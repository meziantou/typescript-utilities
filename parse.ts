export function parseString(obj: any): string | null {
	if (isNullOrUndefined(obj)) {
		return null;
	}

	if (isString(obj)) {
		return obj;
	}

	return String(obj);
}

export function parseNumber<T>(obj: any, defaultValue: T): number | T {
	if (isNullOrUndefined(obj)) {
		return defaultValue;
	}

	if (isNumber(obj)) {
		return obj;
	}

	if (isString(obj)) {
		const f = parseFloat(obj);
		if (!isNaN(f)) {
			return f;
		}

		const i = parseInt(obj, 10);
		if (!isNaN(i)) {
			return i;
		}
	}

	return defaultValue;
}

export function parseBoolean<T>(obj: any, defaultValue: T): boolean | T {
	if (isBoolean(obj)) {
		return obj;
	}

	if (isNumber(obj)) {
		return obj !== 0;
	}

	if (isString(obj)) {
		let upper = obj.toUpperCase();
		switch (upper) {
			case "TRUE":
			case "1":
				return true;

			case "FALSE":
			case "0":
				return false;
		}
	}

	return defaultValue;
}

export function parseInteger<T>(str: string, defaultValue: T): number | T {
	let parsedValue = parseNumber(str, NaN);
	if (isNaN(parsedValue)) {
		return defaultValue;
	}

	if (isNumber(parsedValue)) {
		return Math.trunc(parsedValue);
	}

	return defaultValue;
}
