import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQuality";
import Qualitie from "./qualitie";

const QualitiesList = ({ qualities: qualitiesId }) => {
  const { getQuality, isLoading } = useQualities();
  if (isLoading) {
    return "Loading...";
  }
  const qualities = qualitiesId.map((id) => getQuality(id));
  return (
    <>
      {qualities.map((qualitie) => (
        <Qualitie key={qualitie._id} {...qualitie} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array,
};

export default QualitiesList;
