import React from 'react';

import Typography from 'antd/lib/typography';

function Copyright() {
  return (
    <Typography style={{ textAlign: 'center' }}>
      {'Copyright © '}
      <a type="link" href="https://expyhist.github.io/" target="_blank" rel="noreferrer">
        leafsYang的博客
      </a>
      {` 2021~${new Date().getFullYear()}.`}
    </Typography>
  );
}

export default Copyright;
