import { Resend } from 'resend';

// Only initialize if API key exists to prevent build-time crashes
export const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;
