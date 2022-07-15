const SearchStatus = ({ number }) => {
  if (number === 0) {
    return (
      <span className="badge bg-danger">Никто с тобой не тусанет сегодня</span>
    );
  }

  let a = "";
  const numberEnding = +number.toString().at(-1);
  if ((number < 11 || number > 14) && numberEnding >= 2 && numberEnding <= 4)
    a = "а";
  return (
    <span className="badge bg-primary">
      {number} человек{a} тусанет с тобой сегодня
    </span>
  );
};

export default SearchStatus;
