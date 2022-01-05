import React from "react"

import { Form, Tag } from "antd";

import SingleFiltersOption from "./SingleFiltersOption";
import { parseParamFromURL } from "@/utils/parseParamFromURL";

const FiltersOption = (props) => {

  const { url, form, filtersNum } = props;

  const params = parseParamFromURL(url);
  const regex = /appCode|pageNum|pageSize/;
  const options = JSON.parse(JSON.stringify(params, (k, v) => { if (typeof k === "string" && regex.test(k)) { return undefined } return v }));

  let content = []

  if (filtersNum) {
    Object.entries(filtersNum).forEach(([key, value]) => {
      for (let i=0; i<parseInt(value); i++) {
        content.push(<SingleFiltersOption keyName={key} rank={i} options={options} key={key+i} />);
      }
    })
  }

  return (
    <>
      {
        options && 
        Object.keys(options).map(key => {
          return (<Tag color="cyan" key={key}>{key}</Tag>);
        })
      }
      <Form 
        name="filter-option"
        form = {form}
      >
        {
          filtersNum && content
        }
      </Form>
    </>
  );
}

export default FiltersOption;