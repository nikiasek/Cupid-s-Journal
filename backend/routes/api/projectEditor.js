const express = require('express');
const router = express.Router();
const projectEditorController = require('../../controllers/projectEditorController');

router.route('/')
    .get(projectEditorController.saveEditor);

module.exports = router;