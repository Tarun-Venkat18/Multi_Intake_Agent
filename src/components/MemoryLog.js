import React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RefreshIcon from '@mui/icons-material/Refresh';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

function MemoryLog({ memory, setMemory }) {
  const handleRefresh = async () => {
    const res = await axios.get('http://localhost:8000/documents');
    const docs = res.data;
    // Transform docs into input_metadata and extracted_fields arrays
    const input_metadata = docs.map(doc => [
      doc.id, doc.source, doc.type, doc.timestamp, doc.intent, doc.routed_agent
    ]);
    const extracted_fields = docs.map(doc => [
      doc.id, doc.routed_agent, doc.extracted_fields
    ]);
    setMemory({ input_metadata, extracted_fields });
  };

  if (!memory) return (
    <Card sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
      <CardContent>
        <HistoryEduIcon sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="body1">No logs loaded yet. Click Refresh to load logs.</Typography>
        <Button onClick={handleRefresh} variant="contained" color="primary" startIcon={<RefreshIcon />} sx={{ mt: 2 }}>
          Refresh
        </Button>
      </CardContent>
    </Card>
  );
  const { input_metadata, extracted_fields } = memory;

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <HistoryEduIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" color="primary" fontWeight={600}>
            Memory Log
          </Typography>
          <Button onClick={handleRefresh} variant="outlined" color="primary" startIcon={<RefreshIcon />} sx={{ ml: 'auto' }}>
            Refresh
          </Button>
        </Box>
        <Box mb={3}>
          <Typography variant="subtitle1" color="primary" fontWeight={500} gutterBottom>
            Input Metadata
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 260, overflow: 'auto' }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Intent</TableCell>
                  <TableCell>Agent</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {input_metadata && [...input_metadata].reverse().map(row => (
                  <TableRow key={row[0]}>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell>{row[2]}</TableCell>
                    <TableCell>{row[3]}</TableCell>
                    <TableCell>{row[4]}</TableCell>
                    <TableCell>{row[5]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <Typography variant="subtitle1" color="primary" fontWeight={500} gutterBottom>
            Extracted Fields
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 260, overflow: 'auto' }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Agent</TableCell>
                  <TableCell>Fields</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {extracted_fields && [...extracted_fields].reverse().map(row => (
                  <TableRow key={row[0]}>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell><Box component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: 'none', m: 0 }}>{row[2]}</Box></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MemoryLog; 