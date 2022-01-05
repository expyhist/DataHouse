import React from "react";

import message from "antd/lib/message";
import Button from "antd/lib/Button";

import XLSX from "xlsx";

const ExportTable = (props) => {

  const { dataSource } = props;
  
  const exportExcel = async () => {

    if (dataSource === null) {
      return message.error("导出错误，无数据", 3);
    }

    try {
      const data = dataSource.map(dataSource => JSON.parse(JSON.stringify(dataSource, (k, v) => { if(k !== "uuid") return v; else return undefined })));
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet");
      XLSX.writeFile(wb, "result.xlsx");
    }
    catch (err) {
      message.error(err.data.error, 3);
    }
  }

  return (
    <Button onClick={exportExcel}>导出</Button>
  );
}

export default ExportTable;