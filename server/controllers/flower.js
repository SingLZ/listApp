import { pool } from '../config/database.js'

const getFlowers = async (req, res) => {
    const results = await pool.query('SELECT * FROM gifts ORDER BY id ASC')
    res.status(200).json(results.rows)
    
} 

export default {
  getFlowers
}

