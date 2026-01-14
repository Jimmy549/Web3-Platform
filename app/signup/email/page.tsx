'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { useSignupMutation } from '@/store/services/auth';
import { setCredentials } from '@/store/slices/authSlice';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Link from 'next/link';

export default function SignupEmailPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [signup, { isLoading }] = useSignupMutation();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/profile');
    }
  }, [isAuthenticated, router]);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const result = await signup({ name, email, password }).unwrap();
      
      dispatch(setCredentials({
        user: result.user,
        token: result.access_token
      }));
      
      router.push('/profile');
    } catch (err: any) {
      setError(err?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Card sx={{ width: '100%', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', border: '2px solid #73FDAA', borderRadius: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h3" align="center" gutterBottom sx={{ background: 'linear-gradient(135deg, #73FDAA 0%, #22c55e 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold', mb: 2 }}>
              Create Account
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <form onSubmit={handleEmailSignup}>
              <TextField fullWidth label="Full Name" value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} InputProps={{ style: { color: '#fff' } }} InputLabelProps={{ style: { color: '#73FDAA' } }} />
              <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} InputProps={{ style: { color: '#fff' } }} InputLabelProps={{ style: { color: '#73FDAA' } }} />
              <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3 }} InputProps={{ style: { color: '#fff' }, autoComplete: 'current-password' }} InputLabelProps={{ style: { color: '#73FDAA' } }} />
              <Button fullWidth type="submit" variant="contained" size="large" startIcon={isLoading ? <CircularProgress size={20} /> : <PersonAddIcon />} disabled={isLoading} sx={{ background: 'linear-gradient(135deg, #73FDAA 0%, #22c55e 100%)', color: '#000', py: 1.5, fontWeight: 'bold', fontSize: '1.1rem', '&:hover': { background: 'linear-gradient(135deg, #22c55e 0%, #73FDAA 100%)' }, '&:disabled': { background: '#666', color: '#999' } }}>
                {isLoading ? 'Creating...' : 'Create Account'}
              </Button>
            </form>

            <Typography variant="body2" align="center" color="textSecondary" sx={{ mt: 3 }}>
              Already have an account? <Link href="/login" style={{ color: '#73FDAA', textDecoration: 'none', fontWeight: 'bold' }}>Sign In</Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
