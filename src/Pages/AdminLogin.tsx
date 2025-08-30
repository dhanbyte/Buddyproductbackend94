import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AdminAPI } from '../lib/api';

// Import Material-UI components
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  CircularProgress,
  Divider
} from '@mui/material';

// Import icons
import { FiLock } from 'react-icons/fi';
import { AdminPanelSettings } from '@mui/icons-material';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await AdminAPI.login({ username, password });
      if (result.success) {
        // Store admin key in localStorage for subsequent API calls
        localStorage.setItem('adminKey', result.adminKey);
        toast.success('Admin login successful');
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ py: 8 }}>
      <Paper 
        elevation={6} 
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
          <AdminPanelSettings fontSize="large" />
        </Avatar>
        
        <Typography component="h1" variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
          Admin Login
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem' }}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <FiLock />}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Default Admin Credentials:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Username: <b>admin</b> | Password: <b>admin123</b>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminLogin;