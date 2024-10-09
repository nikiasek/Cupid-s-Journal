const projectDb = require("../models/project")

const listProjects = async (req, res) => { // Add the auth middleware to this route
    const { id } = req.user

    const project = await projectDb.find({createdBy: id})

    try {
        console.log(project)
        res.json("succesful")
    } catch (e) {
        console.error(e)
        res.status(500).json("not succesful /editor/save")
    }
}

module.exports = {listProjects}