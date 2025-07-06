import React, { useEffect, useState } from 'react';
import api from '../api';
import { Box, Tabs, Tab, Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Card, CardContent } from '@mui/material';
import ErpDetailView from './ErpDetailView';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import FlagIcon from '@mui/icons-material/Flag';
import SendIcon from '@mui/icons-material/Send';
const docTypes = ['Invoice', 'RFQ', 'Complaint', 'Regulation', 'Email', 'PDF', 'JSON'];

function ErpDashboard() {
  const [tab, setTab] = useState(0);
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    fetchDocs();
  }, [tab]);

  const fetchDocs = async () => {
    const type = docTypes[tab];
    const res = await api.get('/documents', { params: { doc_type: type } });
    setDocuments(res.data);
  };

const handleAction = async (docId, status) => {
  await api.post(`/documents/${docId}/status`, { status });
  await fetchDocs(); // Refresh the list

  // Find the updated document from the refreshed list
  const updatedDoc = documents.find(doc => doc.id === docId);
  if (updatedDoc) {
    setSelectedDoc(updatedDoc); // Keep modal open with updated details
  }
  // If you want to close the modal only on "Close" button, remove setSelectedDoc(null) here
};
const statusIcon = (status) => {
  switch (status) {
    case 'Approved':
      return <CheckCircleIcon sx={{ color: 'green.main', verticalAlign: 'middle', mr: 1 }} />;
    case 'Sent to Accounting':
      return <SendIcon sx={{ color: 'blue.main', verticalAlign: 'middle', mr: 1 }} />;
    case 'Flagged':
      return <FlagIcon sx={{ color: 'orange.main', verticalAlign: 'middle', mr: 1 }} />;
    default:
      return <HourglassEmptyIcon sx={{ color: 'grey.500', verticalAlign: 'middle', mr: 1 }} />;
  }
};
const statusColor = (status = '') => {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'green';
    case 'sent to accounting':
      return 'blue';
    case 'flagged':
      return 'orange';
    default:
      return 'grey';
  }
};

  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}
         variant="scrollable"
  scrollButtons="auto"
  sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        {docTypes.map((type, idx) => <Tab key={type} label={type} />)}
      </Tabs>
      <Box mt={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Intent</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...documents].reverse().map(doc => (
              <TableRow key={doc.id}>
                <TableCell>{doc.id}</TableCell>
                <TableCell>{doc.source}</TableCell>
                <TableCell>{doc.intent}</TableCell>
                <TableCell style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
  <Box component="span" sx={{ color: statusColor(doc.status), fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}>
    {doc.status}
    {statusIcon(doc.status)}
  </Box>
</TableCell>

                <TableCell>
                  <Button onClick={() => setSelectedDoc(doc)}>View</Button>
                  <Button onClick={() => handleAction(doc.id, 'Approved')}>Approve</Button>
                  <Button onClick={() => handleAction(doc.id, 'Sent to Accounting')}>Send to Accounting</Button>
                  <Button onClick={() => handleAction(doc.id, 'Flagged')}>Flag for Review</Button>
                </TableCell>
              </TableRow>
            ))}
            
          </TableBody>
        </Table>
      </Box>
      {selectedDoc && (
        <ErpDetailView doc={selectedDoc} onClose={() => setSelectedDoc(null)} onAction={handleAction} />
      )}
    </Box>
  );
}

export default ErpDashboard;