import React from "react"

import { Form, Tag } from "antd";

import { SingleFiltersOption } from "./SingleFiltersOption";

export const FiltersOption = (props) => {

  const { url, form, filtersNum } = props;

  const urlParams = url.match(/(?<=\?)(.*)/g)[0];
  const urlParamsJson = JSON.parse(`{"` + urlParams.replaceAll(`=`, `":"`).replaceAll(`&`, `","`) + `"}`);
  const regex = new RegExp("appCode|pageNum|pageSize");
  const options = JSON.parse(JSON.stringify(urlParamsJson, (k, v) => { if (typeof k === "string" && regex.test(k)) { return undefined } return v }));

  return (
    <Form 
      name="filter-option"
      form = {form}
    >
      {
        options && 
        Object.keys(options).map(key => {
          return (<Tag color="cyan" key={key}>{key}</Tag>);
        })
      }
      {
        filtersNum && 
        Object.entries(filtersNum).map(([key, value]) => {
          for (let i=0; i<parseInt(value); i++) {
            return (<SingleFiltersOption keyName={key} rank={i} options={options} key={key+i} />);
          }
        })
      }
    </Form>
  );
}
