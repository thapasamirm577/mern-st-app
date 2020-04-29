let { 
  createStudentList, 
  getStudentsList, 
  editStudentList, 
  updateStudentsList, 
  deleteStudentList 
} = require('../controllers/student.controllers');

let express = require('express');
let router = express.Router();

router.post('/create-student', createStudentList);
router.get('/', getStudentsList);
router.get('/edit-student/:id', editStudentList);
router.put('/update-student/:id', updateStudentsList);
router.delete('/delete-student/:id', deleteStudentList);

module.exports = router;
