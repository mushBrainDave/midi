import React from "react";
import { Alert } from "antd";
import { FormikErrors } from "formik";
import { omit, pick } from "lodash";
import { FormattedPlural } from "./FormattedPlural";

export interface IValidationProps<FormValuesType> {
    /**
     * Object representing the current forms errors
     * @example
     * // formik will give you this value as
     * this.props.errors
     */
    errors: FormikErrors<FormValuesType>;

    /**
     * Object representing the current form values. This is required in order to be
     * able to resolve lazy schemas
     * @example
     * // formik will give you this value as
     * this.props.values
     */
    values: FormValuesType;

    /**
     * yup.ObjectSchema
     * @example
     * yup.object().shape<IFormValues>({
     *   field: yup.string().label("Field")
     * });
     */
    scheme: any;

    /**
     * If you only want to show the summary after the form is submitted, pass {this.props.submitCount} into this component
     * @example
     * showAfterSubmit={this.props.submitCount}
     */
    showAfterSubmit?: number;

    /**
     * Keys to exclude from display in this validation summary. Can be used to exclude certain keys from displaying, or to include multiple validation summaries on page with different errors.
     * Works with nested keys as well. ie: subgroup.property, subgroup.subgroup.property
     * @example
     * excludedKeys={["statusChangeComments"]}
     */
    excludedKeys?: (keyof FormValuesType | string)[];

    /**
     * Keys to include in display in this validation summary. Can be used to include only certain keys in the summary.
     * Works with nested keys as well. ie: subgroup.property, subgroup.subgroup.property
     * @example
     * includedKeys={["statusChangeComments", "attachedFiles.someProperty"]}
     */
    includedKeys?: (keyof FormValuesType | string)[];
}

function getLabelWithSuffix(label: string, arrayLabelSuffix?: string) {
    return arrayLabelSuffix ? label + " " + arrayLabelSuffix : label;
}

/**
 * Format a single error item. The label is guaranteed
 */
function formatError(
    error: string,
    label: string,
    arrayLabelSuffix?: string,
    hideArrayLabel?: boolean
) {
    const labelWithSuffix = getLabelWithSuffix(label, arrayLabelSuffix);

    return (
        <li key={labelWithSuffix}>
            {hideArrayLabel ? label : labelWithSuffix}: {error}
        </li>
    );
}

/**
 * Format an error item that is an object or an array.
 * If the label is not provided, render the children errors instead and skip a
 * level in the list tree.
 */
function formatErrors(
    errors: JSX.Element[],
    label?: string,
    arrayLabelSuffix?: string,
    hideArrayLabel?: boolean
) {
    if (label) {
        const labelWithSuffix = getLabelWithSuffix(label, arrayLabelSuffix);
        return (
            <li key={labelWithSuffix}>
                {hideArrayLabel ? label : labelWithSuffix}: <ul>{errors}</ul>
            </li>
        );
    }
    return errors;
}

/**
 * Recursively get a formatted list of errors for the validation schema
 * @param errors - The current errors object to recurse through
 * @param schema - The schema that corresponds to the errors param
 * @param values - The form values object used to evaluate lazy schemas
 * @param arrayLabelSuffix - The "number" index to append to the yup schema label if
 * the errors element is a child in an array
 */
export function getErrorSummaryForObjectSchema<FormValuesType>(
    errors: FormikErrors<FormValuesType> | any,
    schema: any,
    values: FormValuesType,
    arrayLabelSuffix?: string,
    hideArrayLabel?: boolean
): JSX.Element | JSX.Element[] {
    if (typeof errors === "string") {
        // Base case: we've reached a leaf node/property of the errors object
        if (schema._label === undefined) {
            throw new Error(
                `<ValidationSummary /> requires labels on all yup fields, set labels within your validators using - fieldName: yup.string().label("Field Name") (missing on schema '${errors}')`
            );
        }
        return formatError(errors, schema._label, arrayLabelSuffix, hideArrayLabel);
    } else {
        // Recursive case: we've reached an error node that is an object or array

        const renderedSubErrors = Object.keys(errors)
            // Arrays have undefined error values up until the first element that
            // has an error
            .filter((errorKey) => errors[errorKey] !== undefined)
            .flatMap((errorKey) => {
                let newArrayLabelSuffix = arrayLabelSuffix;
                if (Array.isArray(errors) && !isNaN(parseInt(errorKey))) {
                    hideArrayLabel = false;
                    const itemNumberStr = String(parseInt(errorKey) + 1);
                    // If the error node is an array, then add or append to the
                    // label suffix the current array item number
                    newArrayLabelSuffix = arrayLabelSuffix
                        ? arrayLabelSuffix + "-" + itemNumberStr
                        : itemNumberStr;
                } else if (schema._label) {
                    // If the current parent error summary has the number label applied,
                    // don't add the label to the child error summary
                    newArrayLabelSuffix = undefined;
                }

                /*
                 * If the current error node is an array, then all of the sub errors
                 * are of the same type (_subType). Otherwise, get the schema subtype
                 * using the object key.
                 */
                let subSchema = schema._subType || schema.fields[errorKey];
                // Need to resolve lazy schemas
                if (subSchema._resolve) {
                    subSchema = subSchema._resolve(values[errorKey]);
                    if (schema._subType) {
                        // If schema is an array with a lazy schema subtype, don't display
                        // the array index, but we still need to add it to the key
                        hideArrayLabel = true;
                    }
                }
                const subError = errors[errorKey];
                return getErrorSummaryForObjectSchema(
                    subError,
                    subSchema,
                    values[errorKey],
                    newArrayLabelSuffix,
                    hideArrayLabel
                );
            });
        return formatErrors(renderedSubErrors, schema._label, arrayLabelSuffix, hideArrayLabel);
    }
}

export class ValidationSummary<FormValuesType> extends React.Component<
    IValidationProps<FormValuesType>
> {
    static defaultProps = {
        excludedKeys: [],
        includedKeys: [],
    };

    render() {
        const { scheme, errors, showAfterSubmit, values, excludedKeys, includedKeys } = this.props;

        if (excludedKeys!.length > 0 && includedKeys!.length > 0) {
            throw new Error(
                "<ValidationSummary /> should not include props for both excludedKeys and includedKeys"
            );
        }

        let summaryErrors;

        if (excludedKeys!.length > 0) {
            summaryErrors = omit(errors, excludedKeys!);
        }

        if (includedKeys!.length > 0) {
            summaryErrors = pick(errors, includedKeys!);
        }

        summaryErrors = summaryErrors || errors;

        if (Object.keys(summaryErrors).length === 0 || showAfterSubmit === 0) {
            return null;
        }

        // formik gives us a FormikErrors object and not the underlying yup validation object which is where out meta data is stored
        // If this request is made we can switch all of this to be much cleaner and gain some features: https://github.com/jaredpalmer/formik/issues/797
        const errorMessages = getErrorSummaryForObjectSchema<FormValuesType>(
            summaryErrors,
            scheme,
            values,
            undefined,
            undefined
        );

        const errorCount = Array.isArray(errorMessages) ? errorMessages.length : 1;

        return (
            <Alert
                message={
                    <>
                        Please correct the following{" "}
                        <FormattedPlural value={errorCount} one="field" other="fields" />:
                    </>
                }
                description={<ul>{errorMessages}</ul>}
                showIcon={true}
                type="error"
            />
        );
    }
}
