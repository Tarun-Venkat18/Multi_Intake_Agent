import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';

function IntakeForm({ setResult, setMemory }) {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (file) formData.append('file', file);
    if (text) formData.append('text', text);
    try {
      const res = await axios.post('http://localhost:8000/intake', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data);
      // Fetch memory log after submission
      const memRes = await axios.get('http://localhost:8000/memory');
      setMemory(memRes.data);
    } catch (err) {
      setResult({ error: 'Submission failed' });
    }
    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="primary" fontWeight={500} gutterBottom>
          Upload PDF or JSON
        </Typography>
        <Input
          type="file"
          inputProps={{ accept: '.pdf,.json,application/pdf,application/json' }}
          onChange={e => setFile(e.target.files[0])}
          fullWidth
          disableUnderline
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="primary" fontWeight={500} gutterBottom>
          Or paste email/text
        </Typography>
        <TextField
          value={text}
          onChange={e => setText(e.target.value)}
          multiline
          minRows={4}
          maxRows={8}
          fullWidth
          variant="outlined"
          placeholder="Paste email or text here..."
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={loading}
        sx={{ borderRadius: 2, fontWeight: 600, px: 4, py: 1.5 }}
      >
        {loading ? 'Processing...' : 'Submit'}
      </Button>
    </Box>
  );
}

export default IntakeForm; 