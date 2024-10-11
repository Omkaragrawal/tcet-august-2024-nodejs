import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    id: Number,
    name: String,
    username: String,
    email: String,
    address: Object,
    phone: String,
    website: String,
    company: Object,
});

export default userSchema;