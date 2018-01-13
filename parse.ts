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

export function parseDateTime<T>(value: any, defaultValue: T): Date | T {
	if (isDate(value)) {
		return value;
	}

	if (isString(value)) {
		// Format /Date(<ticks>+<offset>)/
		let a = /\/Date\(((?:-|\+)?\d*)((?:-|\+)\d*)?\)\//.exec(value);
		if (a) {
			var date = new Date(+a[1]); // new Date(ticks) = new Date(Ticks + getTimeZone) => We need to remove the timezone
			date = new Date(date.getTime() + (date.getTimezoneOffset() * 60 * 1000));
			if (a[2]) {
				// add timezone
				var tz = +a[2]; // +0200, -0130
				var offset = (tz / 100 * 60) + (tz % 100); // minutes
				return new Date(date.getTime() + offset * 60000);
			}
			return date;
		}

		// Format 0000-00-00T00:00:00
		// Format 0000-00-00 00:00:00
		// Format 0000/00/00 00:00:00
		let b = /(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})((T| )(\d{1,2}):(\d{1,2})(:(\d{1,2})))?/.exec(value);
		if (b) {
			// ["2012-01-01T01:02:03", "2012", "-", "01", "-", "01", "T01:02:03", "T", "01", "02", ":03", "03"]
			let year = parseInteger(b[1], 0);
			let month = parseInteger(b[3], 1) - 1; // 0 based
			let day = parseInteger(b[5], 0);
			let hours = parseInteger(b[8], 0);
			let minutes = parseInteger(b[9], 0);
			let seconds = parseInteger(b[11], 0);

			return new Date(year, month, day, hours, minutes, seconds, 0);
		}
	}

	return defaultValue;
}

export function parseTime<T>(value: any, defaultValue: T): TimeSpan | T {
	if (value instanceof TimeSpan) {
		return value;
	}

	if (isString(value)) {
		const a = /(\d+):(\d+)(?::(\d+))?/.exec(value);
		if (a) {
			const hours = parseInt(a[1], 10);
			const minutes = parseInt(a[2], 10);
			const seconds = parseInt(a[3], 10);
			return TimeSpan.fromTime(hours, minutes, seconds);
		}
	}

	if (typeof value === "number" && isFinite(value)) {
		return TimeSpan.fromTicks(value);
	}

	const ticks = parseInt(value, 10);
	if (isFinite(ticks)) {
		return parseTime(ticks, defaultValue);
	}

	return defaultValue;
}
