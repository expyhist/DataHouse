import React from 'react';

import Form from 'antd/lib/form';
import Tag from 'antd/lib/tag';

import SingleFiltersOption from './SingleFiltersOption';
import { parseParamFromURL } from '@/utils/parseParamFromURL';

function FiltersOption({ url, form, filtersNum }) {
  const params = parseParamFromURL(url);
  const regex = /appCode|pageNum|pageSize/;
  const options = JSON.parse(JSON.stringify(params, (k, v) => { if (typeof k === 'string' && regex.test(k)) { return undefined; } return v; }));

  const content = [];

  if (filtersNum) {
    Object.entries(filtersNum).forEach(([key, value]) => {
      for (let i = 0; i < parseInt(value, 10); i += 1) {
        content.push(
          <SingleFiltersOption keyName={key} rank={i} options={options} key={key + i} />,
        );
      }
    });
  }

  return (
    <>
      {
        options
        && Object.keys(options).map((key) => (<Tag color="cyan" key={key}>{key}</Tag>))
      }
      <Form
        name="filter-option"
        form={form}
      >
        {
          filtersNum && content
        }
      </Form>
    </>
  );
}

export default FiltersOption;
