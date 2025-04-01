import express from 'express'
import { getAllCompanies, getJobsByStatusForUser } from '../controllers/user_get.js'

const router = express.Router()

router.post("/jobs_by_status", getJobsByStatusForUser)
router.post("/get_companies", getAllCompanies)

export default router