import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IntakeForm from './IntakeForm';
import ResultDisplay from './ResultDisplay';

function IntakeTab() {
  const [result, setResult] = useState(null);
  const [memory, setMemory] = useState(null); // For updating logs after submit

  return (
    <Card elevation={3} sx={{ mb: 3 }}>
      <CardContent>
        <IntakeForm setResult={setResult} setMemory={setMemory} />
        <ResultDisplay result={result} />
      </CardContent>
    </Card>
  );
}

export default IntakeTab; 