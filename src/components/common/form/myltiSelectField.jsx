import Select from "react-select";
import PropTypes from "prop-types";

const MyltiSelectField = ({ options, onChange, name, label, defaultValue }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object" ? Object.values(options) : options;

  const handleChange = (value) => {
    onChange({ name: name, value });
  };

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        onChange={handleChange}
        closeMenuOnSelect={false}
        defaultValue={defaultValue}
        options={optionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
};

MyltiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.array,
};

export default MyltiSelectField;
