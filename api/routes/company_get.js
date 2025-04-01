import express from 'express'
import { getApplicationsByStatusForCompany, getProfessionalByJobStatus } from '../controllers/company_get.js'

const router = express.Router()

router.post("/appl_by_status", getApplicationsByStatusForCompany)
router.post("/prof_by_status", getProfessionalByJobStatus)

export default router