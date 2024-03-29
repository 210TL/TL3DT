const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
	route: '/login',
	method: 'post',
	async: true,
	exec: ({ req, res, db }) => {
		try {      
			const { Email, Password } = req.body;
					// Make sure there is an Email and Password in the request
					if (!(Email && Password)) {
							res.status(400).send("All input is required");
					}
							
					let user = [];
					
					var sql = "SELECT * FROM Users WHERE Email = ?";
					db.all(sql, Email, function(err, rows) {
							if (err){
									res.status(400).json({"error": err.message})
									return;
							}
	
							rows.forEach(function (row) {
									user.push(row);                
							})
							
							var PHash = bcrypt.hashSync(Password, user[0].Salt);
				 
							if(PHash === user[0].Password) {
									// * CREATE JWT TOKEN
									const token = jwt.sign(
											{ user_id: user[0].Id, username: user[0].Username, Email },
												process.env.TOKEN_KEY,
											{
												expiresIn: "1h", // 60s = 60 seconds - (60m = 60 minutes, 2h = 2 hours, 2d = 2 days)
											}  
									);
	
									user[0].Token = token;
	
							} else {
									return res.status(400).send("No Match");          
							}
	
						 return res.status(200).send(user);                
					});	
			
			} catch (err) {
				console.log(err);
			} 
	}
}