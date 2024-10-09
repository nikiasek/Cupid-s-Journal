const express = require('express');
const router = express.Router();
const projectBrowserController = require('../../controllers/projectBrowserController');

router.route('/')
    .get(projectBrowserController.listProjects);

module.exports = router;