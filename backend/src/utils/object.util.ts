export function removeUndefinedFields<T extends Record<string, unknown>>(obj: T): { [K in keyof T]?: T[K] } {
    const cleaned: Record<string, unknown> = {};
    for (const key of Object.keys(obj)) {
        if (obj[key] !== undefined) {
            cleaned[key] = obj[key];
        }
    }
    return cleaned as { [K in keyof T]?: T[K] };
}
