'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/profile');
    }
  }, [isAuthenticated, router]);

  const handleGoogleLogin = () => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    window.location.href = `${backendUrl}/auth/google`;
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Card
          sx={{
            width: '100%',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
            border: '2px solid #73FDAA',
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #73FDAA 0%, #22c55e 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                mb: 2,
              }}
            >
              Welcome Back
            </Typography>
            
            <Typography
              variant="body1"
              align="center"
              color="textSecondary"
              sx={{ mb: 4 }}
            >
              Sign in to access your Web3 dashboard
            </Typography>

            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{
                background: 'linear-gradient(135deg, #73FDAA 0%, #22c55e 100%)',
                color: '#000',
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1.1rem',
                '&:hover': {
                  background: 'linear-gradient(135deg, #22c55e 0%, #73FDAA 100%)',
                },
              }}
            >
              Sign in with Google
            </Button>

            <Typography
              variant="body2"
              align="center"
              color="textSecondary"
              sx={{ mt: 3 }}
            >
              Don&apos;t have an account?{' '}
              <Link 
                href="/signup" 
                style={{ 
                  color: '#73FDAA', 
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
