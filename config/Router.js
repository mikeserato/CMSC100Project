'use strict';

var student = require(__dirname + '/../controllers/Student');
var grade = require(__dirname + '/../controllers/Grade');

module.exports = function(router) {

	router.put('/searchStudent', student.searchByStudentNumber);
	router.put('/searchStudent', student.searchByName);
	router.put('/searchStudent', student.search);
	router.post('/addStudent', student.add);
	router.put('/deleteStudent', student.archive);
	router.put('/updateStudent', student.edit);
	
	router.post('/addGrade', grade.create);
	router.post('/getGrade', grade.retrieve);
	router.put('/updateGrade', grade.update);
	router.delete('/deleteGrade', grade.remove);
	
	return router;
};
