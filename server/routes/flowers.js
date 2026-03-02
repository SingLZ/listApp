import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import flowerData from '../data/flowers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json(flowerData)
})

router.get('/:giftId', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/flower.html'))
})

export default router
