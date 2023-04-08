import mysql from 'mysql2'

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'information_schema'
})


export default {
	query: (query, values) => new Promise((res, rej) => {
		db.query(query, values, (err, q) => {
			if (err) rej(err)
			res(q)
		})
	}),
}