var express 	= require('express');
var router 		= express.Router();
var userModel	= require.main.require('./models/user-model');

router.get('*', function(req, res,next){
	console.log('Registration page requested!');
	res.render('registration/index');
});

router.post('/', function(req, res){
		
		var user ={
			employeename: req.body.employeename,
			contactno: req.body.contactno,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};
		console.log(user.employeename);
		userModel.insert(user, function(status){
			if(status){
				res.redirect('/login');
			}else{
				res.redirect('/registration');
			}
		});
})

module.exports = router;

