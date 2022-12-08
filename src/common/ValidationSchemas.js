import * as Yup from "yup";

//Generic user Input Schema
export const inputSchema = Yup.string()
  .required("* Required field")
  .min(2, "* Must be at least 2 characters")
  .max(40, "* Must be not longer than 35 characters");

//Generic user Input Schema
export const passwordSchema = Yup.string()
  .required("* Required field")
  .min(5, "* Password must be at least 5 characters")
  .max(20, "* Password cannot be longer than 20 characters")
  .matches(/^\S*$/, "Passwords cannot contain white spaces");
