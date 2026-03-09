import './dotenv.js'
import { pool } from './database.js'
import flowerData from '../data/flowers.js'

const createGiftsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS gifts;

        CREATE TABLE IF NOT EXISTS gifts (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            pricePoint VARCHAR(10) NOT NULL,
            audience VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            submittedBy VARCHAR(255) NOT NULL,
            submittedOn TIMESTAMP NOT NULL
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 gifts table created successfully')
    } catch (err) {
        console.error('⚠️ error creating gifts table', err)
    }
}

const seedGiftsTable = async () => {
    await createGiftsTable()

    flowerData.forEach((flower) => {
        const insertQuery = {
            text: 'INSERT INTO gifts (name, pricePoint, audience, image, description, submittedBy, submittedOn) VALUES ($1, $2, $3, $4, $5, $6, $7)'
        }

        const values = [
            flower.name,
            flower.pricePoint,
            flower.audience,
            flower.image,
            flower.description,
            flower.submittedBy,
            flower.submittedOn
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting flower', err)
                return
            }

            console.log(`✅ ${flower.name} added successfully`)
        })
    })
}

seedGiftsTable()