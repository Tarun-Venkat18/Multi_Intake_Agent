import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DescriptionIcon from '@mui/icons-material/Description';

function ResultDisplay({ result }) {
  if (!result) return (
    <Card sx={{ mt: 3, mb: 2, p: 2, textAlign: 'center', color: 'text.secondary' }}>
      <CardContent>
        <DescriptionIcon sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="body1">Submit a file or text to see results here.</Typography>
      </CardContent>
    </Card>
  );
  return (
    <Card sx={{ mt: 3, mb: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" color="primary" fontWeight={600}>
            Extraction Result
          </Typography>
        </Box>
        <Box component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: 'background.paper', borderRadius: 2, p: 2, fontSize: 15, m: 0 }}>
          {JSON.stringify(result, null, 2)}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ResultDisplay; 