import React from "react";
import { storiesOf } from "@storybook/react";
import { Form, Input } from "antd";
import { withFormik, FormikProps } from "formik";
import { FormItemAutomatic } from "../helpers/FormItemAutomatic";
import yup from "../helpers/yup.utils";

interface IFormikFormValues {
    myRequiredValue: string;
    myOptionalValue?: string;
}

class FormItemAutomaticInternalStory extends React.Component<FormikProps<IFormikFormValues>> {
    render() {
        const { handleChange, values, handleSubmit } = this.props;
        return (
            <Form onSubmitCapture={handleSubmit} layout="vertical">
                <FormItemAutomatic<IFormikFormValues> id="myRequiredValue">
                    <Input
                        id="myRequiredValue"
                        name="myRequiredValue"
                        value={values.myRequiredValue}
                        onChange={handleChange}
                    />
                </FormItemAutomatic>
                <FormItemAutomatic<IFormikFormValues> id="myOptionalValue">
                    <Input
                        id="myOptionalValue"
                        name="myOptionalValue"
                        value={values.myOptionalValue}
                        onChange={handleChange}
                    />
                </FormItemAutomatic>
            </Form>
        );
    }
}

const mockedSchema = yup.object().shape<IFormikFormValues>({
    myRequiredValue: yup.string().required().label("My Required Value"),
    myOptionalValue: yup.string().label("My Optional Value"),
});

const FormItemAutomaticStory = withFormik<{}, IFormikFormValues>({
    handleSubmit: () => {},
    mapPropsToValues: () => ({
        myRequiredValue: "",
        myOptionalValue: "",
    }),
    validationSchema: mockedSchema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
})(FormItemAutomaticInternalStory);

storiesOf("helpers", module).add("FormItemAutomatic", () => <FormItemAutomaticStory />);
