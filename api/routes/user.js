import express from 'express'
import { updateProfile, applyToJob, getApplicationStatus, withdrawApplication, acceptInvite, acceptJobOffer, getUser } from '../controllers/user.js'

const router = express.Router()

router.get("/:id", getUser);
router.post("/update_user_profile", updateProfile)
router.post("/apply_to_job", applyToJob)
router.post("/get_application_status", getApplicationStatus)
router.post("/withdraw_application", withdrawApplication)
router.post("/accept_invite", acceptInvite)
router.post("/accept_job_offer", acceptJobOffer)
export default router