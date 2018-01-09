export function isUndefined(obj: any): obj is undefined {
    return typeof (obj) === "undefined";
}

export function isNullOrUndefined(obj: any): obj is undefined | null {
    return isUndefined(obj) || obj === null;
}

export function isFunction(obj: any): obj is Function {
    return typeof (obj) === "function";
}

export function isObject(obj: any): obj is Object {
    return obj !== null && typeof (obj) === "object";
}

export function isNumber(obj: any): obj is number {
    return typeof (obj) === "number" && !isNaN(obj);
}

export function isString(obj: any): obj is string {
    return typeof (obj) === "string";
}

export function isBoolean(obj: any): obj is boolean {
    return typeof (obj) === "boolean";
}

export function isDate(obj: any): obj is Date {
    return obj instanceof Date;
}

export function isArray(obj: any): obj is Array<any> {
    return Array.isArray(obj);
}

export function isPromiseLike(obj: any): obj is PromiseLike<any> {
    return isObject(obj) && isFunction(obj.then);
}

export function isArrayLike<T>(obj: any): obj is ArrayLike<T> {
    return isObject(obj) && ("length" in obj);
}
