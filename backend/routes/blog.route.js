const express = require("express")
const blogModel = require("../models/blog.model")
const auth = require("../middlewares/auth")
const checkAccess = require("../middlewares/checkAccess")
const ROLES = require("../costant/roles")
const router = express.Router()

// 1. Get blogs - No need of auth
router.get("/", async (req, res) => {
    try {
        const AllBlogs = await blogModel.find()
        res.status(201).json(AllBlogs)
    } catch (error) {
        res.status(500).json({ message: `${error} Internal Server Error !` })
    }
})

// 2. Create blog - Need authentication / Author
router.post("/create", auth, checkAccess(ROLES.author), async (req, res) => {
    try {
        const { title, content } = req.body
        const userId = req.userId
        const newBlog = new blogModel({ title, content, author: userId })
        await newBlog.save()
        res.status(201).json({ message: "Blog Successfully Created", newBlog })
    } catch (error) {
        res.status(500).json({ message: `${error} Internal Server Error !` })
    }
})

// 3. Edit blog - Need authentication / Author of this blog
router.patch("/update/:id", auth, checkAccess(ROLES.author), async (req, res) => {
    try {
        const blogId = req.params.id
        const ExistingBlog = await blogModel.findById(blogId)
        if (!ExistingBlog) {
            res.status(500).json({ message: "Blog Not Exists !" })
        }
        if (req.userId.toString() !== ExistingBlog.author.toString()) {
            res.status(403).json({ message: "Forbitton : Unauthorized Access " })
        }
        const updatedBlog = await blogModel.findByIdAndUpdate(blogId, req.body, { new: true })
        res.status(201).json({ message: "Blog Successfully Updated", updatedBlog })
    } catch (error) {
        res.status(500).json({ message: `${error} Internal Server Error !` })
    }
})
// 4. Delete blog - Need authentication / Author of this blog
router.delete("/delete/:id", auth, checkAccess(ROLES.author), async (req, res) => {
    try {
        const blogId = req.params.id
        const ExistingBlog = await blogModel.findById(blogId)
        if (!ExistingBlog) {
            res.status(500).json({ message: "Blog Not Exists !" })
        }
        if (req.userId.toString() !== ExistingBlog.author.toString()) {
            res.status(403).json({ message: "Forbitton : Unauthorized Access " })
        }
        const deletedBlog = await blogModel.findByIdAndDelete(blogId, { new: true })
        res.status(201).json({ message: "Blog Successfully Deleted", deletedBlog })
    } catch (error) {
        res.status(500).json({ message: `${error} Internal Server Error !` })
    }
})

// 5. Get a specific blog - No need of auth
router.get("/:id", async (req, res) => {
    try {
        const blogId = req.params.id
        const ExistingBlog = await blogModel.findById(blogId)
        if (!ExistingBlog) {
            res.status(500).json({ message: "Blog Not Found !" })
        }
        res.status(201).json({ message: "Blog Successfully Created", ExistingBlog })
    } catch (error) {
        res.status(500).json({ message: `${error} Internal Server Error !` })
    }
})



module.exports = router