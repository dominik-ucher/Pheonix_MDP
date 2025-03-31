import express from 'express'
import { postJob, initiateApplication, updateApplicationStatus } from '../controllers/company_job.js'

const router = express.Router()

router.post("/create_job", postJob)
router.post("/create_application", initiateApplication)
router.post("/update_status", updateApplicationStatus)

export default router