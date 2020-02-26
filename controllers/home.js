var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){	
	if(req.cookies['username'] != null){
		userModel.getByUname(req.cookies['username'], function(result){
			res.render('home/index', {user: result});
		});
	}else{
		res.redirect('/logout');
	}
});

router.get('/alluser', function(req, res){
	userModel.getAll(function(results){
		if(results.length > 0){
			res.render('home/alluser', {userlist: results});
		}else{
			res.send('invalid username/password');
		}
	});
})


router.get('/edit/:eid', function(req, res){
	
	userModel.getById(req.params.eid, function(result){
		res.render('home/edit', {user: result});
	});
})

router.post('/edit/:eid', function(req, res){
	
	var user = {
		employeename:req.body.employeename,
		contactno:req.body.contactno,
		username: req.body.username,
		password: req.body.password,
		type: req.body.type,
		eid: req.params.eid
	};

	userModel.update(user, function(status){
		if(status){
			res.redirect('/home/alluser');
		}else{
			res.redirect('/home/edit/'+req.params.eid);
		}
	});
})


router.get('/delete/:eid', function(req, res){
	
	userModel.getById(req.params.eid, function(result){
		res.render('home/delete', {user: result});
	});
})

router.post('/delete/:eid', function(req, res){
	
	userModel.delete(req.params.eid, function(status){
		if(status){
			res.redirect('/home/alluser');
		}else{
			res.redirect('/home/delete/'+req.params.eid);
		}
	});
})

module.exports = router;

