import { get } from "lodash";

/**
 * Similar to getValidateStatus but only shows the error when the field has been touched
 * @param errors pass formik errors
 * @param touched pass formik touched
 * @param fieldName key name of the field, lodash deep names supported (example: "group.field", or "list[3].field")
 */
export function getValidateStatusTouched<E, T>(
    errors: E,
    touched: T,
    fieldName: (keyof E & keyof T) | string
) {
    if (errors === undefined || touched === undefined) {
        return undefined;
    }

    // only show errors when the field has been touched and an error exists
    if (get(errors, fieldName) !== undefined && get(touched, fieldName) !== undefined) {
        return "error";
    }

    return undefined;
}

export type KeyOfOrString<FormValues = undefined> = FormValues extends undefined | number | null
    ? string
    : keyof FormValues;

export interface IFormattedPluralProps<Type> {
    value: number;
    zero?: Type;
    one?: Type;
    other: Type;
}
export function formattedPlural<Type = string>(options: IFormattedPluralProps<Type>) {
    const { value, zero, one, other } = options;

    if (value === 0 && zero) {
        return zero;
    }

    if (value === 1 && one) {
        return one;
    }

    return other;
}
