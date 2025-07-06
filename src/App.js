import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IntakeTab from './components/IntakeTab';
import LogsTab from './components/LogsTab';
import ErpDashboard from './components/ErpDashboard';

function App() {
  const [tab, setTab] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#1976d2' },
    },
    shape: { borderRadius: 12 },
    typography: { fontFamily: 'Segoe UI, Arial, sans-serif' },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ mt: 6, mb: 6,px: 4}}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" color="primary" fontWeight={700}>
            Multi-Format Intake Agent
          </Typography>
          <IconButton onClick={() => setDarkMode((d) => !d)} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
  <Tab label="Intake" />
  <Tab label="Logs" />
  <Tab label="ERP Dashboard" /> {/* Add this */}
</Tabs>
<Box>
  {tab === 0 && <IntakeTab />}
  {tab === 1 && <LogsTab />}
  {tab === 2 && <ErpDashboard />} {/* Add this */}
</Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 