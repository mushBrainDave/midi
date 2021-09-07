import * as yup from "yup";

export default yup;
/**
 * Returns the SchemaDescription for the field at the given path in the schema
 * @param schema Schema for the form
 * @param path Path to a given field in the form
 * @param value All form values for schema.  Only needed for lazy loaded schemas
 */
export function getFieldSchema<FormValues>(
    schema: yup.Schema<FormValues>,
    path: string,
    value?: FormValues
): yup.SchemaDescription {
    let result = yup.reach(schema, path, value);
    return result.describe();
}

/**
 * Returns true if a given field is required in the yup schema, else false
 * @param schema Schema for the form
 * @param fieldName Path to a given field in the form
 * @param value All form values for schema.  Only needed for lazy loaded schemas
 */
export function isFieldRequired<FormValues>(
    schema: any,
    fieldName: string,
    value?: FormValues
): boolean {
    return (
        getFieldSchema(schema, fieldName, value).tests.find(
            (validator: any) => validator.name === "required"
        ) !== undefined
    );
}
