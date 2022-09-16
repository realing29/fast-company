const displayDate = (timeStamp) => {
  const date = new Date(parseInt(timeStamp));
  const currentDate = new Date();

  let diff = date.getFullYear() !== currentDate.getFullYear();
  if (diff) {
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDay()}`;
  }

  diff = date.getMonth() !== currentDate.getMonth() && date.getDay() !== currentDate.getDay();
  if (diff) {
    return `${date.getDay()} ${date.toLocaleString("default", { month: "long" })}`;
  }

  diff = date.getHours() !== currentDate.getHours();
  if (diff) {
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  diff = currentDate.getMinutes() - date.getMinutes();
  if (diff < 5) {
    return "1 минуту назад";
  }
  if (diff < 10) {
    return "5 минут назад";
  }
  if (diff < 30) {
    return "10 минут назад";
  }
  if (diff < 60) {
    return "30 минут назад";
  }
};

export default displayDate;
