import express from 'express'
import routes from './routes/routes.js'

const app = express()

const cors = (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Headers', '*')
	next();
}

app.use([express.json(), express.urlencoded({ extended: true }), cors])
routes(app)

const PORT = 80 | process.env.PORT

app.listen(PORT, console.log(`!! 80 !!`))