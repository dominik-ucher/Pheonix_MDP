import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js'
import authCompanyRoutes from './routes/auth_company.js'
import contactRoutes from './routes/contact.js'
import companyGetRoutes from './routes/company_get.js'
import userGetRoutes from './routes/user_get.js'
import userRoutes from './routes/user.js'
import companyRoutes from './routes/company.js'

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/auth_company", authCompanyRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/company_get", companyGetRoutes)
app.use("/api/user_get", userGetRoutes)
app.use("/api/company", companyRoutes)
app.use("/api/user", userRoutes)

const CV_Storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/upload/CV');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '__' + file.originalname);
    },
});
const CV_Upload = multer({ storage: CV_Storage });
app.post('/api/upload_CV', CV_Upload.single('file'), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.delete('/api/delete_CV', async function (req, res) {
    const fileName = req.body.filename; // Ensure this matches the client-side key
    const filePath = path.join(__dirname, '../client/upload/CV', fileName); // Use path.join for cross-platform compatibility

    try {
        // Check if the file exists
        await fs.promises.access(filePath, fs.constants.F_OK);

        // Delete the file
        await fs.promises.unlink(filePath);
        res.status(200).json({ message: 'File deleted successfully' });
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('File not found:', err);
            res.status(404).json({ message: 'File not found' });
        } else {
            console.error('Error deleting file:', err);
            res.status(500).json({ message: 'Error deleting file' });
        }
    }
});

const Company_Logo_Storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/upload/Company_Logo');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '__' + file.originalname);
    },
});
const Company_Logo_Upload = multer({ storage: Company_Logo_Storage });
app.post('/api/upload_company_logo', Company_Logo_Upload.single('file'), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.delete('/api/delete_company_logo', async function (req, res) {
    const fileName = req.body.filename; // Ensure this matches the client-side key
    const filePath = path.join(__dirname, '../client/upload/Company_Logo', fileName); // Use path.join for cross-platform compatibility

    try {
        // Check if the file exists
        await fs.promises.access(filePath, fs.constants.F_OK);

        // Delete the file
        await fs.promises.unlink(filePath);
        res.status(200).json({ message: 'File deleted successfully' });
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('File not found:', err);
            res.status(404).json({ message: 'File not found' });
        } else {
            console.error('Error deleting file:', err);
            res.status(500).json({ message: 'Error deleting file' });
        }
    }
});

const Profile_Picture_Storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/upload/Profile_Picture');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '__' + file.originalname);
    },
});
const Profile_Picture_Upload = multer({ storage: Profile_Picture_Storage });
app.post('/api/upload_profile_picture', Profile_Picture_Upload.single('file'), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.delete('/api/delete_profile_picture', async function (req, res) {
    const fileName = req.body.filename; // Ensure this matches the client-side key
    const filePath = path.join(__dirname, '../client/upload/Profile_Picture', fileName); // Use path.join for cross-platform compatibility

    try {
        // Check if the file exists
        await fs.promises.access(filePath, fs.constants.F_OK);

        // Delete the file
        await fs.promises.unlink(filePath);
        res.status(200).json({ message: 'File deleted successfully' });
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('File not found:', err);
            res.status(404).json({ message: 'File not found' });
        } else {
            console.error('Error deleting file:', err);
            res.status(500).json({ message: 'Error deleting file' });
        }
    }
});

app.listen(8802,()=>{
    console.log("Connected!")
})
