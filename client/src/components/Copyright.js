import React from 'react';

import Typography from 'antd/lib/typography';
import Button from 'antd/lib/button';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Button type="link" href="https://expyhist.github.io/" target="_blank">
        yanghua博客
      </Button>
      {`2021~${new Date().getFullYear()}`}
      .
    </Typography>
  );
}

export default Copyright;
