import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import API from "../../../api";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../../utils/validator";

const dataInit = { user: "", comment: "" };

const AddCommentsForm = ({ handleCommentAdd }) => {
  const [options, setOptions] = useState([]);
  const [data, setData] = useState(dataInit);
  const { userId: pageId } = useParams();
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    API.users.fetchAll().then((users) => {
      setOptions(Object.values(users).map((user) => ({ value: user._id, label: user.name })));
    });
  }, []);

  const validatorConfig = {
    user: {
      isRequired: {
        message: "Выберите пользователя",
      },
    },
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

  const handleChangeUser = ({ value }) => {
    setData((prev) => ({ ...prev, user: value }));
    validate();
  };

  const handleChangeComment = ({ value }) => {
    setData((prev) => ({ ...prev, comment: value }));
    validate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommentAdd({ pageId, userId: data.user, content: data.comment });
    setData(dataInit);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SelectField
        options={options}
        name="user"
        value={data.user}
        onChange={handleChangeUser}
        defaultOption="Выберите пользователя"
        error={errors.user}
      />
      <TextAreaField
        label="Сообщение"
        name="comment"
        value={data.comment}
        onChange={handleChangeComment}
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
