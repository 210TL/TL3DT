module.exports = {
	route: '/test',
	method: 'get',
	exec: ({req, res}) => {
		res.send('It works!')
	}
}