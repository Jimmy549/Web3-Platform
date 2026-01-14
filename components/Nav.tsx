'use client';

import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Button, Avatar } from '@mui/material';

export default function Nav() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <header className="p-4 bg-coolGray-100 text-coolGray-800 w-full">
      <div className="container flex justify-between h-16 mx-auto">
        <Link
          href="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <svg
            width="58"
            height="58"
            viewBox="0 0 58 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="10" fill="white" />
            <circle cx="10" cy="48" r="10" fill="white" />
            <circle cx="48" cy="48" r="10" fill="white" />
            <circle cx="48" cy="10" r="10" fill="white" />
            <path d="M42 10H15" stroke="white" strokeWidth="3" />
            <path d="M12 16V42" stroke="white" strokeWidth="3" />
            <path d="M15 49H44" stroke="white" strokeWidth="3" />
            <path
              d="M49 44V29"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <h1 className="text-3xl sm:text-4xl font-bold">Circlechain</h1>
        </Link>
        <ul className="items-stretch hidden space-x-3 lg:flex text-xl font-bold">
          <li className="flex ">
            <a
              href="#"
              className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
            >
              How it works
            </a>
          </li>
          <li className="flex ">
            <a
              href="#"
              className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
            >
              Blog
            </a>
          </li>
          <li className="flex ">
            <a
              href="#"
              className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
            >
              Support
            </a>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex justify-between gap-3">
          {isAuthenticated && user ? (
            <>
              <Link href="/profile">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: '#73FDAA',
                    color: '#fff',
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    '&:hover': {
                      borderColor: '#22c55e',
                      background: '#73FDAA22',
                    },
                  }}
                >
                  <Avatar
                    src={user.picture}
                    alt={user.name}
                    sx={{ width: 24, height: 24 }}
                  />
                  {user.name}
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: '#73FDAA',
                    color: '#fff',
                    '&:hover': {
                      borderColor: '#22c55e',
                      background: '#73FDAA22',
                    },
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #73FDAA 0%, #22c55e 100%)',
                    color: '#000',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #22c55e 0%, #73FDAA 100%)',
                    },
                  }}
                >
                  Sign up
                </Button>
              </Link>
            </>
          )}
                    
          <img
            src="logo1.png"
            alt="alt"
            width="30"
            height="30"
            className="mx-3"
          />
          <img
            src="logo2.png"
            alt="alt"
            width="30"
            height="30"
            className="mx-3"
          />
          <img
            src="logo3.png"
            alt="alt"
            width="30"
            height="30"
            className="mx-3"
          />
          <img
            src="logo4.png"
            alt="alt"
            width="30"
            height="30"
            className="mx-3"
          />
        </div>

        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-coolGray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
