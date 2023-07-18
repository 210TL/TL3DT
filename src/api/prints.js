module.exports = {
	route: '/prints',
	method: 'get',
	exec: ({req, res, db}) => {
		const list = [];
		db.each(`SELECT * FROM prints`, (error, row) => {
			if (error) {
				throw new Error(error.message);
			}
			list.push(row);
		});
		setTimeout(() => {
			res.send(list);
		},250);
	}
}