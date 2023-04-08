import model from '../models/model.js'

export default {
	async getAll(req, res) {
		try {
			const response = await model.getAll()
			res.json({ status: 'success', content: response })
		} catch (err) {
			res.json({ status: 'error', message: err.toString() })
		}
	},

	async getEntries({ params: { db, table } }, res) {
		try {
			const response = await model.getEntries(db, table)
			res.json({ status: 'success', content: response })
		} catch (err) {
			res.status(400).json({ status: 400, message: err.toString() })
		}
	},

	async getDetailed(req, res) {
		try {
			const response = await model.getDetailed()
			res.json({ status: 'success', content: response })
		} catch (err) {
			res.json({ status: 'error', message: err.toString() })
		}
	}
}