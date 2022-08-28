const {Pool} = require('pg')

//pool berfungsi destructering karna didalam pg terdapat pool
const dbPool = new Pool({
    database: 'postgres',
    port: 5432,
    user: 'haqim28',
    password: 'admin'
})

module.exports = dbPool