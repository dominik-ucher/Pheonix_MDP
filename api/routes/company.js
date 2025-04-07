import express from 'express'
import { getCompany, editCompanyProfile, postJob, updateJob, deleteJob, initiateApplication, updateApplicationStatus} from '../controllers/company.js'

const router = express.Router()

router.get("/:id", getCompany);
router.put("/update_company_profile", editCompanyProfile)
router.post("/create_job", postJob)
router.post("/update_job", updateJob)
router.post("/delete_job", deleteJob)
router.post("/initiate_application", initiateApplication)
router.post("/update_application_status", updateApplicationStatus)

export default router