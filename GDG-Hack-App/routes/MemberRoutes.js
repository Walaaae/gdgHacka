const express = require("express");
const router = express.Router();
const {
    getMember,
    getMembers,
    createMember,
    updateMember,
    deleteMember
} = require('../controllers/MemberController');

router.route('/members')
    .get(getMembers)
    .post(createMember);

router.route('/members/:id')
    .get(getMember)
    .patch(updateMember)
    .delete(deleteMember);

module.exports = router;