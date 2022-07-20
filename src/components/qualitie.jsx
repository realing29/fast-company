import PropTypes from "prop-types";

const Qualitie = ({ name, color }) => {
  return <span className={`badge bg-${color} m-1`}>{name}</span>;
};

Qualitie.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Qualitie;
