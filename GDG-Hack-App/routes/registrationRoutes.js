const express = require('express');
const router = express.Router();
const {
    createRegistration,
    getRegistrationById,
    updateRegistration,
    deleteRegistration,
    getAllRegistrations

} = require('../controllers/RegistrationController');

router.route('/Registrations').get(getAllRegistrations).post(createRegistration);
router.route('/Registration/:id').get(getRegistrationById).patch(updateRegistration).delete(deleteRegistration);

module.exports = router;
