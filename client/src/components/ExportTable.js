import React from 'react';

import message from 'antd/lib/message';
import Button from 'antd/lib/button';

function ExportTable({ dataSource }) {
  const exportExcel = () => {
    if (dataSource === null) {
      message.error('导出错误，无数据', 3);
    }

    try {
      const data = dataSource.map((ele) => JSON.parse(JSON.stringify(ele, (k, v) => { if (k !== 'uuid') return v; return undefined; })));
      import('xlsx').then((xlsx) => {
        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'Sheet');
        xlsx.writeFile(wb, 'result.xlsx');
      });
    } catch (err) {
      message.error(`查询失败，错误:${err.data.error}`, 3);
    }
  };

  return (
    <Button onClick={exportExcel}>导出</Button>
  );
}

export default ExportTable;
