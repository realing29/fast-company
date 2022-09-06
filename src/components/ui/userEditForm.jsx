import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MyltiSelectField from "../common/form/myltiSelectField";
import { useHistory } from "react-router-dom";

const UserEditForm = ({ userId }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: [],
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [isLoading, setIsLoading] = useState({ data: false, qualities: false, professions: false });
  const history = useHistory();

  useEffect(() => {
    api.users.getById(userId).then((user) => {
      setData({
        ...user,
        profession: user.profession._id,
        qualities: user.qualities.map(({ name, _id, color }) => ({
          label: name,
          value: _id,
          color,
        })),
      });
      setIsLoading((prev) => ({ ...prev, data: true }));
    });
  }, []);

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id,
      }));
      setProfessions(professionsList);
      setIsLoading((prev) => ({ ...prev, professions: true }));
    });
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color,
      }));
      setQualities(qualitiesList);
      setIsLoading((prev) => ({ ...prev, qualities: true }));
    });
  }, []);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Email введен не корректно",
      },
    },
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color,
          });
        }
      }
    }
    return qualitiesArray;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;
    api.users.update(userId, {
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities),
    });
    history.push(`/users/${userId}`);
  };

  useEffect(() => setErrors({}), []);
  const allLoading = isLoading.data && isLoading.professions && isLoading.qualities;

  return allLoading ? (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Имя"
              name="name"
              value={data.name}
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label="Электронная почта"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />

            <SelectField
              label="Выберите свою профессию"
              defaultOption="Choose..."
              name="profession"
              options={professions}
              onChange={handleChange}
              value={data.profession}
              error={errors.profession}
            />
            <RadioField
              options={[
                { name: "Male", value: "male" },
                { name: "Female", value: "female" },
                { name: "Other", value: "other" },
              ]}
              value={data.sex}
              name="sex"
              onChange={handleChange}
              label="Выберите ваш пол"
            />
            <MyltiSelectField
              options={qualities}
              onChange={handleChange}
              value={data.qualities}
              name="qualities"
              label="Выберите ваши качества"
            />
            <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">
              Обновить
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    "Loading..."
  );
};

UserEditForm.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserEditForm;
