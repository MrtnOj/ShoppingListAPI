const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'shoppinglist',
    password: '1',
    port: 5432,
})

export default pool