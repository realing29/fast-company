import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../../utils/validator";

const AddCommentsForm = ({ handleCommentAdd }) => {
  const [data, setData] = useState({});
  // const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validatorConfig = {
    comment: {
      min: {
        message: "Текст должен составлять минимум 4 символа",
        value: 4,
      },
    },
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  useEffect(() => {
    setIsValid(validate());
  }, [data]);
  useEffect(() => setErrors({}), []);

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
    validate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommentAdd({ content: data.comment });
    setData({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextAreaField
        label="Сообщение"
        name="comment"
        value={data.comment || ""}
        onChange={handleChange}
        error={errors.comment}
      />
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary" disabled={!isValid}>
          Опубликовать
        </button>
      </div>
    </form>
  );
};

AddCommentsForm.propTypes = {
  handleCommentAdd: PropTypes.func,
};

export default AddCommentsForm;
