// npm install mongoose
const mongoose = require('mongoose');

async function connectDatabase() {
    try {
        const client = await mongoose.connect(
            process.env.mongo_db_connection_string
        );
        console.log('Database connected!');
        return client;
    } catch(err) {
        console.error({ err });
        throw err;
    }
}

module.exports.default = connectDatabase();