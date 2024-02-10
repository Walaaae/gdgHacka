
const express = require("express")
const router = express.Router()
const {
    getUserInfo
} = require('../controllers/authController')

router.route('/user').get(getUserInfo)


module.exports = router
