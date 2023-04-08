import db from './db.js'

export default {
	async getAll() {
		return await db.query('select table_schema as database_name,table_name from information_schema.tables where table_type = "BASE TABLE" and table_schema not in ("information_schema","mysql", "performance_schema","sys","sakila","world") order by database_name, table_name')
	},

	async getEntries(database, table) {
		return await db.query('select * from ' + database + '.' + table)
	},

	async getDetailed() {
		const dbs = await this.getAll()
		const edited = await Promise.all(dbs.map(async (_db) => ({ ..._db, schema: await db.query('describe ' + _db.database_name + '.' + _db.TABLE_NAME) })))
		return edited
	}
}