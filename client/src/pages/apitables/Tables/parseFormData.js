export const parseFormData = (filtersType, filtersOption, formData) => {
  const {
    title, startData, endDate, date, content,
  } = filtersOption;
  const payload = {};

  switch (filtersType) {
    case 'rangeDate': {
      const rangeData = [formData[title][0].format('YYYY-MM-DD'), formData[title][1].format('YYYY-MM-DD')];
      [payload[startData], payload[endDate]] = rangeData;
      break;
    }
    case 'singleDate': {
      const singleDate = formData[title].format('YYYY-MM-DD');
      payload[date] = singleDate;
      break;
    }
    case 'text': {
      const text = formData[title];
      payload[content] = text;
      break;
    }
    default:
      break;
  }

  return payload;
};
