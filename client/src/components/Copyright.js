import React from "react";

import Typography from "antd/lib/Typography";
import Button from "antd/lib/Button";
  
const Copyright = (props) => {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {"Copyright © "}
      <Button type="link" href="https://expyhist.github.io/" target="_blank">
        yanghua博客
      </Button>
      {"2021~" + new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;