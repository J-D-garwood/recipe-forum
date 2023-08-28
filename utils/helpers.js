module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return `${new Date(date).getDate() + 1}/${new Date(date).getMonth()}/${
      new Date(date).getFullYear() + 5
    }`;
  },
};
