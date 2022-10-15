import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MyltiSelectField from "../common/form/myltiSelectField";
import { useHistory } from "react-router-dom";
import BackHistoryButton from "../common/backHistoryButton";
import { useProfessions } from "../../hooks/useProfession";
import { useQualities } from "../../hooks/useQuality";
import { useUser } from "../../hooks/useUsers";
import { useAuth } from "../../hooks/useAuth";
import ConfirmModal from "./confirmModal";

const UserEditForm = ({ userId }) => {
  const history = useHistory();
  const { changeProfile, currentUser, signIn } = useAuth();
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: [],
  });
  const [errors, setErrors] = useState({});
  const { professions, isLoading: isLoadingProfessions } = useProfessions();
  const { qualities, isLoading: isLoadingQualities, getQuality } = useQualities();
  const { getUserById } = useUser();
  const [password, setPassword] = useState("");
  const allLoaded = !isLoadingProfessions && !isLoadingQualities;

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    if (!allLoaded) {
      return;
    }
    const user = getUserById(userId);
    setData({
      ...user,
      profession: user.profession,
      qualities: user.qualities.map((_id) => {
        const { name, color } = getQuality(_id);

        return {
          label: name,
          value: _id,
          color,
        };
      }),
    });
  }, [allLoaded]);

  const transformProfessions = (data) =>
    Object.keys(data).map((professionName) => ({
      label: data[professionName].name,
      value: data[professionName]._id,
    }));

  const transformQualities = (data) =>
    Object.keys(data).map((optionName) => ({
      label: data[optionName].name,
      value: data[optionName]._id,
      color: data[optionName].color,
    }));

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleChangePassword = (target) => {
    setPassword(target.value);
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
    password: {
      isRequired: {
        message: "Пароль не должен быть пустым",
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

  async function updateProfile() {
    const isValid = validate();
    if (!isValid) return;
    const { qualities } = data;
    const newData = {
      ...data,
      qualities: qualities.map(({ value }) => value),
    };
    try {
      await changeProfile(newData);
      history.push("/users/" + currentUser._id);
    } catch (error) {
      handleShow();
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile();
  };

  // Почему-то для firebase при изменении email пользователя важно что бы сессия была свежая.
  const confirmAuthorization = async () => {
    await signIn({ email: currentUser.email, password });
    await updateProfile();
    setShowModal(false);
  };

  useEffect(() => {
    setErrors({});
  }, []);

  return allLoaded ? (
    <div className="container mt-5">
      <ConfirmModal
        title="Для подтверждения введите ваш пароль"
        showModal={showModal}
        handleClose={handleClose}
        confirm={confirmAuthorization}
      >
        <TextField
          name="password"
          value={password}
          onChange={handleChangePassword}
          error={errors.name}
          type="password"
        />
      </ConfirmModal>
      <BackHistoryButton />
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
              options={transformProfessions(professions)}
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
              options={transformQualities(qualities)}
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
