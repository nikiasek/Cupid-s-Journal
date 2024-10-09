const projectDb = require("../models/project")

const saveEditor = async (req, res) => { // Add the auth middleware to this route
    const { htmlContent, projectSettings } = req.body
    const { id } = req.user

    try {
        const project = await projectDb.create({htmlContent, projectSettings, createdBy: id})
        project.save()
        console.log(project)
        res.json("succesful")
    } catch (e) {
        console.error(e)
        res.status(500).json("not succesful /editor/save")
    }
}

module.exports = {saveEditor}