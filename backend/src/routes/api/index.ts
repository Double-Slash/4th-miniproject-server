import { Router } from "express"

import history from "./history"
import notice from "./notice"
import question from "./question"
import auth from "./auth"

// Init router and path
const router = Router()

/* Route Path
 * Directory Structure
 *  /api
 *      /about -> aboutDS(동아리 연혁)
 *      /notice -> 게시판 관련
 *      /question -> QA 채널
 *      /auth -> 마스터 계정 관리
 */

router.use("/auth", auth)
router.use("/history", history)
router.use("/notice", notice)
router.use("/qa", question)

// Export the base-router
export default router
