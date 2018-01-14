export function equalsIgnoreCase(str1: string, str2: string) {
	if (isNullOrUndefined(str1) && isNullOrUndefined(str2)) {
		return true;
	}

	if (isNullOrUndefined(str1) || isNullOrUndefined(str2)) {
		return false;
	}

	return str1.toLowerCase() === str2.toLowerCase();
}

export function endsWith(str: string, suffix: string): boolean {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

export function nullify(value: string | null, trim: boolean): string | null {
	if (isNullOrEmpty(value)) {
		return null;
	}

	if (trim) {
		value = value.trim();
	}

	if (isNullOrEmpty(value)) {
		return null;
	}

	return value;
}

export function isNullOrWhiteSpace(value: string | null | undefined) {
	if (isNullOrUndefined(value))
		return true;

	value = value.trim();
	return value === "";
}

export function isNullOrEmpty(value: string | null | undefined): value is null | undefined | "" {
	if (isNullOrUndefined(value))
		return true;

	return value === "";
}
