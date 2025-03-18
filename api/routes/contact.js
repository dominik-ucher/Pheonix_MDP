import express from 'express';
import { sendEmail } from '../controllers/contact.js';

const router = express.Router();

router.post('/send-email', sendEmail);

export default router;