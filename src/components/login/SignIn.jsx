import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { inputSchema, passwordSchema } from "../../common/ValidationSchemas";
import * as Yup from "yup";
import InputField from "../inputs/InputField";
import PostForm from "../../auth/PostForm";

const initialValues = {
  username: "",
  password: "",
};
const validationSchema = Yup.object({
  username: inputSchema,
  password: passwordSchema,
});
function SignIn({ formData }) {
  const [submitForm, setSubmitForm] = useState(false);

  const handleSubmit = (userDetails) => {
    formData.payload.username = userDetails.username;
    formData.payload.password = userDetails.password;
    setSubmitForm(true);
  };

  return (
    <>
      {!submitForm && (
        <div className="login-app">
          <div className="login-form">
            <div className="title">Sign In with MarkLogic</div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                handleBlur,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <InputField
                    controlId="form-login-uname"
                    label="Username"
                    name="username"
                    errors={errors.username}
                    touched={touched.username}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.username}
                    className={
                      errors.username && touched.username ? "" : "mb-3"
                    }
                  />
                  <InputField
                    controlId="form-login-password"
                    label="Password"
                    name="password"
                    type="password"
                    errors={errors.password}
                    touched={touched.password}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.password}
                    className={
                      errors.password && touched.password ? "" : "mb-3"
                    }
                  />
                  <Button type="submit">Login</Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      {submitForm ? <PostForm postFormData={formData} /> : <></>}
    </>
  );
}

export default SignIn;
