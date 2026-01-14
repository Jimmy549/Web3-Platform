'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { logout as logoutAction } from '@/store/slices/authSlice';
import { useLogoutMutation } from '@/store/services/auth';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const [logoutMutation] = useLogoutMutation();

  useEffect(() => {
    if (!isAuthenticated && !token) {
      router.push('/login');
    }
  }, [isAuthenticated, token, router]);

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(logoutAction());
      router.push('/');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Card
        sx={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          border: '2px solid #73FDAA',
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Avatar
              src={user.picture}
              alt={user.name}
              sx={{
                width: 120,
                height: 120,
                border: '4px solid #73FDAA',
                mb: 2,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                color: '#73FDAA',
                fontWeight: 'bold',
                mb: 1,
              }}
            >
              {user.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Welcome to your profile
            </Typography>
          </Box>

          <Divider sx={{ my: 3, borderColor: '#73FDAA33' }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  background: '#1a1a1a',
                  border: '1px solid #73FDAA33',
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <EmailIcon sx={{ color: '#73FDAA', mr: 2 }} />
                  <div>
                    <Typography variant="caption" color="textSecondary">
                      Email Address
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff' }}>
                      {user.email}
                    </Typography>
                  </div>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  background: '#1a1a1a',
                  border: '1px solid #73FDAA33',
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <PersonIcon sx={{ color: '#73FDAA', mr: 2 }} />
                  <div>
                    <Typography variant="caption" color="textSecondary">
                      User ID
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff' }}>
                      {user.id}
                    </Typography>
                  </div>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          <Box mt={4}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                borderColor: '#73FDAA',
                color: '#73FDAA',
                py: 1.5,
                fontWeight: 'bold',
                '&:hover': {
                  borderColor: '#22c55e',
                  background: '#73FDAA22',
                },
              }}
            >
              Logout
            </Button>
          </Box>

          <Box mt={2} textAlign="center">
            <Button
              variant="text"
              onClick={() => router.push('/')}
              sx={{ color: '#73FDAA' }}
            >
              Back to Home
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
