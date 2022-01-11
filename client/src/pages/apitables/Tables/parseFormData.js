export const parseFormData = (filtersType, filtersOption, formData) => {
  const { title } = filtersOption;
  const payload = {};

  switch (filtersType) {
    case 'rangeDate': {
      const rangeData = [formData[title][0].format('YYYY-MM-DD'), formData[title][1].format('YYYY-MM-DD')];
      payload[filtersOption.startData] = rangeData[0];
      payload[filtersOption.endDate] = rangeData[1];
      break;
    }
    case 'singleDate': {
      const singleDate = formData[title].format('YYYY-MM-DD');
      payload[filtersOption.date] = singleDate;
      break;
    }
    case 'text': {
      const text = formData[title];
      payload[filtersOption.content] = text;
      break;
    }
    default:
      break;
  }

  return payload;
};
