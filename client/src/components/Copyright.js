import React from "react";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://expyhist.github.io/">
        yanghua
      </Link>{" "}
      {"2021~" + new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;