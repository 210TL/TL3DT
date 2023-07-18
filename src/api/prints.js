module.exports = {
	route: '/prints',
	exec: ({req, res, db}) => {
		db.each(`SELECT * FROM prints`, (error, row) => {
			if (error) {
				throw new Error(error.message);
			}
			console.log(row);
		});
	}
}