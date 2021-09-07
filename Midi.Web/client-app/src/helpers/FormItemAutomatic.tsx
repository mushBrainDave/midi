import React from "react";
import { Form } from "antd";
import { getValidateStatusTouched, KeyOfOrString } from "./forms.utils";
import { RequiredFieldIndicator } from "./RequiredFieldIndicator";
import { ErrorMessage, FormikConsumer } from "formik";
import yup, { isFieldRequired, getFieldSchema } from "./yup.utils";
import { get } from "lodash";

export interface ILabelSchema {
    label: string;
    isRequiredFieldIndicatorVisible: boolean;
}

interface IFormItemAutomaticProps<FormValues> {
    /**
     * key name of the field, lodash deep names supported (example: "group.field", or "list[3].field") note: generic cannot be used when using a sub-key
     * id of the field
     */
    id: KeyOfOrString<FormValues> & string;

    /**
     * Set to true if the input being wrapped readOnly. If true, the required field indicator will not be displayed
     * @default false
     */
    readOnly?: boolean;

    /**
     * @default
     * yup validation schema's label, conditionally adds
     * when null no label is used
     */
    label?: null | string | JSX.Element | ((schema: ILabelSchema) => React.ReactNode);

    /**
     * Override for the validator-based required detection.
     * Can use to manually set if the asterisk should be displayed or not.
     */
    required?: boolean;

    className?: string;

    extra?: string;
}

function isYupSchema<T extends object>(schema: any): schema is yup.ObjectSchema<T> {
    return yup.isSchema(schema);
}

/**
 * @example <FormItemAutomatic<FormValues> id="field" />
 * @example <FormItemAutomatic id="object.field" />
 * @example <FormItemAutomatic id="array[0].field" />
 */
function FormItemAutomaticInternal<FormValues extends {}>(
    props: React.PropsWithChildren<IFormItemAutomaticProps<FormValues>>
) {
    const getLabelValue = (
        label:
            | string
            | JSX.Element
            | ((schema: ILabelSchema) => React.ReactNode)
            | null
            | undefined,
        fieldSchemaMetaData: yup.SchemaDescription,
        isRequired: boolean
    ) => {
        let labelToUse;
        if (label === undefined) {
            labelToUse = (
                <>
                    {fieldSchemaMetaData.label}
                    {!props.readOnly && isRequired && <RequiredFieldIndicator />}
                </>
            );
        } else if (typeof label === "function") {
            labelToUse = label({
                label: fieldSchemaMetaData.label,
                isRequiredFieldIndicatorVisible: !props.readOnly && isRequired,
            });
        } else if (label !== null) {
            labelToUse = label;
        }
        return labelToUse;
    };

    return (
        <FormikConsumer>
            {({ touched, errors, validationSchema, setFieldValue, values }) => {
                const { id, label, required, className, extra } = props;

                // Arbitrarily picked `setFieldValue` to determine if we are in a formik form.  Picked this since it's a common prop provided by formik.
                if (!setFieldValue) {
                    throw new Error("Must use FormItemAutomatic in a Formik Form");
                }

                const schema =
                    (typeof validationSchema === "function" && validationSchema()) ||
                    validationSchema;

                if (!isYupSchema<FormValues>(schema)) {
                    throw new Error("Must provide a yup schema!");
                }

                const isRequired =
                    required !== undefined ? required : isFieldRequired(schema, id, values);

                const fieldSchemaMetaData = getFieldSchema(schema, id, values);

                let labelToUse = getLabelValue(label, fieldSchemaMetaData, isRequired);

                return (
                    <Form.Item
                        label={labelToUse}
                        validateStatus={
                            touched !== undefined && get(touched, id) !== undefined
                                ? getValidateStatusTouched(errors, touched, id)
                                : undefined
                        }
                        help={<ErrorMessage name={id} />}
                        className={className}
                        extra={extra}
                    >
                        {props.children}
                    </Form.Item>
                );
            }}
        </FormikConsumer>
    );
}

export const FormItemAutomatic: typeof FormItemAutomaticInternal = React.memo(
    FormItemAutomaticInternal
) as any;
