import { stringify } from "querystring";

export function castNulls<T>(data: T): T {
    const NULL_VALUES = ["NONE", "-1", -1, "-", "Not Found", "Unavailable"];

    for (const key of Object.keys(data)) {
        switch (typeof data[key]) {
            case "string":
            case "number":
                if (NULL_VALUES.includes(data[key]))
                    delete data[key];
                break;
            case "object":
                if (data[key] === null || NULL_VALUES.includes(data[key].name)) delete data[key];
                break;
        }
    }

    return { ...data };
}

export function flattenObjects<T>(data: unknown): T {
    if (typeof data !== "object") return;

    for (const key in data) {
        if (typeof data[key] === "object" && Object.keys(data[key]).every(k => ["dbid", "name"].includes(k))) {
            data[key] = data[key].name
        }
    }

    return { ...data } as unknown as T;
}