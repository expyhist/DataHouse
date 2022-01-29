const { format } = require('date-fns');

const parseTimeForColumns = (data, columns) => {
  const localeData = {};
  columns.forEach((column) => {
    if (data[column]) {
      localeData[column] = format(data[column], 'yyyy-MM-dd HH:mm:ss');
    }
  });
  return { ...data, ...localeData };
};

module.exports = (data, columns) => {
  if (!Array.isArray(columns)) {
    throw new Error('columns is not a list');
  }

  if (!Array.isArray(data)) {
    return parseTimeForColumns(data, columns);
  }

  return data.map((item) => parseTimeForColumns(item, columns));
};
