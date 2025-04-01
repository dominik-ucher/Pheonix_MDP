import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from 'fs';
import authRoutes from './routes/auth.js'
import authCompanyRoutes from './routes/auth_company.js'
import contactRoutes from './routes/contact.js'
import companyGetRoutes from './routes/company_get.js'
import userGetRoutes from './routes/user_get.js'
import userRoutes from './routes/user.js'
import companyRoutes from './routes/company.js'

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
      cb(null, Date.now() + file.originalname);
    },
});
const CV_Upload = multer({ storage: CV_Storage });
app.post('/api/upload_CV', CV_Upload.single('file'), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.post('/api/delete_CV', function (req, res) {
    const fileName = req.body.fileName; // Get the file name from the request body
    const filePath = `../client/upload/CV/${fileName}`; // Construct the full file path

    // Check if the file exists before deleting
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('File not found:', err);
            res.status(404).json({ message: 'File not found' });
        } else {
            // Delete the file
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    res.status(500).json({ message: 'Error deleting file' });
                } else {
                    console.log('File deleted successfully');
                    res.status(200).json({ message: 'File deleted successfully' });
                }
            });
        }
    });
});




app.listen(8801,()=>{
    console.log("Connected!")
})
