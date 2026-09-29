import express from "express"
import { findByUsername } from "../utils/db.js"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/login", (req, res) => {

    const { password, username } = req.body

    if (!password || !username)
        return res.status(400).json({ message: "Invalid credentials" })

    const user = findByUsername(username)

    if (!user)
        return res.status(401).json({ message: "Invalid credentials" })

    if (password !== user._password)
        return res.status(401).json({ message: "Invalid credentials" })

    const token = jwt.sign(user,process.env.JWT_SECRET)
    return res.status(200).json({ token })

})

export default router