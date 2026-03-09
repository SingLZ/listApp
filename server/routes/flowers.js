import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import flowerController from '../controllers/flower.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', flowerController.getFlowers)

router.get('/:giftId', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/flower.html'))
})

export default router
