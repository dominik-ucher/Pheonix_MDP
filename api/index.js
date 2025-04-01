import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.js'
import authCompanyRoutes from './routes/auth_company.js'
import contactRoutes from './routes/contact.js'
import companyJobRoutes from './routes/company_job.js'
import userApplRoutes from './routes/user_appl.js'

const app = express()

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/auth_company", authCompanyRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/company_job", companyJobRoutes)
app.use("/api/user_appl", userApplRoutes)



app.listen(8801,()=>{
    console.log("Connected!")
})
