import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MemoryLog from './MemoryLog';

function LogsTab() {
  const [memory, setMemory] = useState(null);

  return (
    <Card elevation={3}>
      <CardContent>
        <MemoryLog memory={memory} setMemory={setMemory} />
      </CardContent>
    </Card>
  );
}

export default LogsTab; 