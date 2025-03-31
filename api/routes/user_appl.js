import express from 'express'
import { applyToJob, getApplicationStatus, withdrawApplication} from '../controllers/user_appl.js'

const router = express.Router()

router.post("/apply", applyToJob)
router.post("/application_status", getApplicationStatus)
router.post("/delete_application", withdrawApplication)

export default router