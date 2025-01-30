import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setAuth } from '../../store/auth/authSlice';
import userService from '../../api/services/userService';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
} from '@mui/material';

export default function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await userService.signin({ email, password });
      dispatch(setAuth(response));
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center">
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '16px',
            p: 4,
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              data-test="email-input"
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              type="email"
            />
            <TextField
              fullWidth
               data-test="password-input"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              type="password"
            />
            <Button
            data-test="submit-button"
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
} 