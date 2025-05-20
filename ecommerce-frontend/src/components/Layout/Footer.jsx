import React from 'react';
import { Box, Container, Typography, Link, Stack } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="/privacy-policy" color="inherit" underline="hover" variant="body2">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" color="inherit" underline="hover" variant="body2">
              Terms of Service
            </Link>
            <Link href="/contact" color="inherit" underline="hover" variant="body2">
              Contact
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
