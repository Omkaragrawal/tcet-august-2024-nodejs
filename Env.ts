import dotenv from 'dotenv';

if (!Boolean(process.env.is_production)) {
    dotenv.config()
}