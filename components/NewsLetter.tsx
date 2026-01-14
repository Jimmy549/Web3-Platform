'use client';

import React, { useState } from 'react';
import { useSubscribeNewsletterMutation } from '../store/services/newsletter';
import { Snackbar, Alert, CircularProgress } from '@mui/material';

export default function NewsLetter() {
  const [email, setEmail] = useState('');
  const [subscribeNewsletter, { isLoading }] = useSubscribeNewsletterMutation();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid email address',
        severity: 'error',
      });
      return;
    }

    try {
      const response = await subscribeNewsletter({ email }).unwrap();
      setSnackbar({
        open: true,
        message: response.message,
        severity: 'success',
      });
      setEmail(''); // Clear the input
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error?.data?.message || 'Failed to subscribe. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <div className="relative md:py-20 py-3 w-full px-5 flex flex-col md:justify-center md:items-center">
        <div className="flex relative flex-col bg-black rounded-xl border-green-400 border-2 max-w-[1024px] items-center px-8 py-10 md:py-20 md:px-20 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(115,253,170,0.4)] hover:border-[#73FDAA]">
          <h1 className="text-xl md:text-4xl font-bold text-center md:text-left pb-6">
            Want to be aware of all updates
          </h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center md:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={isLoading}
              className="md:w-[35vw] w-full border-2 mx-1 my-3 border-green-500 px-10 py-3 rounded-xl bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-all duration-300 hover:border-[#73FDAA] hover:shadow-[0_0_15px_rgba(115,253,170,0.3)]"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-400 px-10 py-2 rounded-xl text-black font-bold hover:bg-green-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:scale-105 hover:shadow-[0_0_20px_rgba(115,253,170,0.6)]"
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} sx={{ color: '#000' }} />
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        </div>
        <div className="absolute top-10 right-64 bg-[#73FDAA] w-32 h-32 rounded-full blur-2xl md:block hidden"></div>
        <div className="absolute top-60 left-64 bg-[#73FDAA] w-32 h-32 rounded-full blur-2xl md:block hidden"></div>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
