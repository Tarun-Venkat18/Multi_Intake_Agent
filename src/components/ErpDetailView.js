import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableRow, TableCell, Snackbar, Alert } from '@mui/material';
import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import FlagIcon from '@mui/icons-material/Flag';
import SendIcon from '@mui/icons-material/Send';


function ErpDetailView({ doc, onClose, onAction }) {
  const [statusMsg, setStatusMsg] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  let fields = {};
  try {
    fields = JSON.parse(doc.extracted_fields.replace(/'/g, '"'));
  } catch {
    fields = { raw: doc.extracted_fields };
  }

  // Handler for actions
  const handleAction = async (status) => {
    await onAction(doc.id, status);
    setStatusMsg(`Document ${status.toLowerCase()}!`);
    setOpenSnackbar(true);
  };
const statusColor = (status = '') => {
  switch (status.toLowerCase()) {
    case 'approved':
      return (theme) => theme.palette.success.main;
    case 'sent to accounting':
      return (theme) => theme.palette.primary.main;
    case 'flagged':
      return (theme) => theme.palette.warning.main;
    default:
      return (theme) => theme.palette.text.secondary;
  }
};

const statusIcon = (status) => {
  const color = statusColor(status);
  switch (status.toLowerCase()) {
    case 'approved':
      return <CheckCircleIcon sx={{ color, ml: 1 }} />;
    case 'sent to accounting':
      return <SendIcon sx={{ color, ml: 1 }} />;
    case 'flagged':
      return <FlagIcon sx={{ color, ml: 1 }} />;
    default:
      return <HourglassEmptyIcon sx={{ color, ml: 1 }} />;
  }
};

  return (
    <>
      <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Document Details (ID: {doc.id})</DialogTitle>
        <DialogContent>
          <Table>
  <TableBody>
    {Object.entries(fields).map(([k, v]) => (
      <TableRow key={k}>
        <TableCell>{k}</TableCell>
        <TableCell style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
  {v}
</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-end', gap: 2 }}>
  <Button variant="contained" color="success" onClick={() => handleAction('Approved')}>Approve</Button>
  <Button variant="contained" color="primary" onClick={() => handleAction('Sent to Accounting')}>Send to Accounting</Button>
  <Button variant="contained" color="warning" onClick={() => handleAction('Flagged')}>Flag for Review</Button>
  <Button variant="outlined" onClick={onClose}>Close</Button>
</DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {statusMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ErpDetailView;