import { useEffect, useState } from "react";
// import { validator } from "../../utils/validator";
import CheckBoxFiel from "../common/form/checkBoxField";
import TextField from "../common/form/textField";
import * as yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const { signIn } = useAuth();

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validateShema = yup.object().shape({
    password: yup.string().required("Пароль обязателен для заполнения"),
    email: yup
      .string()
      .required("Электронная почта обязательна для заполнения")
      .email("Email введен не корректно"),
  });

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    validateShema
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      await signIn({ email: data.email, password: data.password });
      history.push(history.location.state ? history.location.state.from.pathname : "/");
    } catch (error) {
      setErrors(error);
    }
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
