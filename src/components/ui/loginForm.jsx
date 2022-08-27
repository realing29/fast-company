import { useEffect, useState } from "react";
// import { validator } from "../../utils/validator";
import CheckBoxFiel from "../common/form/checkBoxField";
import TextField from "../common/form/textField";
import * as yup from "yup";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validateShema = yup.object().shape({
    password: yup
      .string()
      .required("Пароль обязателен для заполнения")
      .matches(/(?=.*[A-Z])/, "Пароль должен содержать хотя бы одну заглавную букву")
      .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя бы цифру")
      .matches(/(?=.*[!@#$%^&*])/, "Пароль должен содержать один из специальных символов !@#$%^&*")
      .matches(/(?=.{8,})/, "Пароль должен состоять минимум из 8 символов"),
    email: yup
      .string()
      .required("Электронная почта обязательна для заполнения")
      .email("Email введен не корректно"),
  });

  // const validatorConfig = {
  //   email: {
  //     isRequired: {
  //       message: "Электронная почта обязательна для заполнения",
  //     },
  //     isEmail: {
  //       message: "Email введен не корректно",
  //     },
  //   },
  //   password: {
  //     isRequired: {
  //       message: "Пароль обязателен для заполнения",
  //     },
  //     isCapitalSymbol: {
  //       message: "Пароль должен содержать хотя бы одну заглавную букву",
  //     },
  //     isContainDigit: {
  //       message: "Пароль должен содержать хотя бы цифру",
  //     },
  //     min: {
  //       message: "Пароль должен состоять минимум из 8 символов",
  //       value: 8,
  //     },
  //   },
  // };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    // const errors = validator(data, validatorConfig);
    validateShema
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    // setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log("🚀 ~ file: login.jsx ~ line 14 ~ handleSubmit ~ data", data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxFiel value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxFiel>
      <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
