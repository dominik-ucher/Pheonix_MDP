import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.js'
import authCompanyRoutes from './routes/auth_company.js'
import contactRoutes from './routes/contact.js'
import companyGetRoutes from './routes/company_get.js'
import userGetRoutes from './routes/user_get.js'
import userRoutes from './routes/user.js'
import companyRoutes from './routes/company.js'

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
app.use("/api/company_get", companyGetRoutes)
app.use("/api/user_get", userGetRoutes)
app.use("/api/company", companyRoutes)
app.use("/api/user", userRoutes)



app.listen(8801,()=>{
    console.log("Connected!")
})
