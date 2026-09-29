import express from "express"
import { authorizeModification } from "../middleware/authorize.js"
import { addMovie, deleteMovie, getWatchlist, updateMovie } from "../utils/db.js"
const router = express.Router()

router.get("/:userId", (req, res) => {
    const watchlist = getWatchlist(parseInt(req.params.userId))
    res.status(200).json(watchlist)
})

router.post("/:userId/movies", authorizeModification, (req, res) => {
    const data = req.body
    const userId = parseInt(req.params.userId)
    addMovie(userId, data)
    res.status(201).json({ message: "added" })
})

router.put("/:userId/movies/:movieId", authorizeModification, (req, res) => {
    const userId = parseInt(req.params.userId)
    const movieId = parseInt(req.params.movieId)
    const data = req.body
    updateMovie(userId, movieId, data)
    res.status(200).json({ message: "edited" })
})

router.delete("/:userId/movies/:movieId", authorizeModification, (req, res) => {
    const userId = parseInt(req.params.userId)
    const movieId = parseInt(req.params.movieId)
    deleteMovie(userId, movieId)
    res.status(200).json({ message: "deleted" })
})

export default router