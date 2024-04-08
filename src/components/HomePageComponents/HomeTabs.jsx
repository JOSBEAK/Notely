import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";
import { TaskContext } from "../../TaskContext";

function CustomTabPanel(props) {
  const { value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    ></div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function HomeTabs() {
  const [value, setValue] = React.useState(0);
  const { setTabsFilter } = React.useContext(TaskContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "30%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="All"
            onClick={() => {
              setTabsFilter("");
            }}
          />
          <Tab
            label="Personal"
            onClick={() => {
              setTabsFilter("Personal");
            }}
          />
          <Tab
            label="Home"
            onClick={() => {
              setTabsFilter("Home");
            }}
          />
          <Tab
            label="Business"
            onClick={() => {
              setTabsFilter("Business");
            }}
          />
        </Tabs>
      </Box>
    </Box>
  );
}
