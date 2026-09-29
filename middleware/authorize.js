export function authorizeModification(req, res, next) {
    const { role, id } = req.user    
    
    if (role !== "parent" && role !== "child")
        return res.status(403).json({ "error": "Access denied" })

    if (role === "child" && req.params.userId != id)
        return res.status(403).json({ "error": "Access denied" })

    next()
}