import React from 'react';
import './clubProfileRight.scss';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Overview from '../overview/Overview';
import Members from '../members/Members';
import EventTemp from '../../pages/EventTemp';
import EventDetails from '../../pages/EventDetails/EventDetails';
import Leaderboard from '../Leaderboard/Leaderboard';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ClubProfileRight = ({ club, setClub }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="club-profile-container">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: '#3aaf9f',
              },
            }}
            aria-label="basic tabs example">
            <Tab
              label="Overview"
              {...a11yProps(0)}
              sx={{
                '&:focus': {
                  color: '#3aaf9f',
                },
                '&.Mui-selected': { color: '#3aaf9f' },
              }}
            />
            <Tab
              label="Members"
              {...a11yProps(1)}
              sx={{
                '&:focus': {
                  color: '#3aaf9f',
                },
                '&.Mui-selected': { color: '#3aaf9f' },
              }}
            />
            <Tab
              label="Events"
              {...a11yProps(2)}
              sx={{
                '&:focus': {
                  color: '#3aaf9f',
                },
                '&.Mui-selected': { color: '#3aaf9f' },
              }}
            />
            <Tab
              label="Leaderboard"
              {...a11yProps(3)}
              sx={{
                '&:focus': {
                  color: '#3aaf9f',
                },
                '&.Mui-selected': { color: '#3aaf9f' },
              }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Overview club={club} setClub={setClub} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Members club={club} setClub={setClub} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/* <EventTemp /> */}
          <EventDetails club={club} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Leaderboard club={club} setClub={setClub} />
        </TabPanel>
      </Box>
    </div>
  );
};

export default ClubProfileRight;
