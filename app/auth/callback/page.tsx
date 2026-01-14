'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/slices/authSlice';
import { useGetProfileQuery } from '@/store/services/auth';
import { CircularProgress, Container, Typography, Box } from '@mui/material';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const token = searchParams?.get('token');

  // Store token first
  useEffect(() => {
    if (token && typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }, [token]);

  // Use RTK Query to fetch profile
  const { data: user, isLoading, error } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    if (user && token) {
      dispatch(setCredentials({ user, token }));
      router.push('/profile');
    }

    if (error) {
      console.error('Failed to fetch profile:', error);
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [user, token, error, dispatch, router]);

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} sx={{ color: '#73FDAA', mb: 2 }} />
        <Typography variant="h5" color="#73FDAA">
          Authenticating...
        </Typography>
      </Box>
    </Container>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
        >
          <CircularProgress size={60} sx={{ color: '#73FDAA' }} />
        </Box>
      </Container>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
