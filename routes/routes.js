import controller from '../controllers/controller.js'
import express from 'express'

export default app => {
	const router = express.Router()

	router.get('/', controller.getAll)
	router.get('/detailed', controller.getDetailed)
	router.get('/:db/:table', controller.getEntries)

	app.use('/api/v1', router)
}