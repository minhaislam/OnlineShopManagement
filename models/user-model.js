var db = require('./db');

module.exports ={
	getById: function(eid, callback){
		var sql = "select * from employees where eid=?";
		db.getResult(sql, [eid], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getByUname: function(uname, callback){
		var sql = "select * from employees where username=?";
		db.getResult(sql, [uname], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	validate: function(user, callback){
		var sql = "select * from employees where username=? and password=?";
		db.getResult(sql, [user.username, user.password], function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAll:function(callback){
		var sql = "select * from employees";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	insert: function(user, callback){
		var sql = "insert into employees values(?,?,?,?,?)";
		db.execute(sql, [user.employeenamename,user.contactno,user.username, user.password, user.type], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(eid, callback){
		var sql = "delete from employees where eid=?";
		db.execute(sql, [eid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(user, callback){
		var sql = "update employees set employeename=?, contactno=? ,username=?, password=?, type=? where eid=?";
		db.execute(sql, [user.employeename,user.contactno,user.username, user.password, user.type, user.eid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}