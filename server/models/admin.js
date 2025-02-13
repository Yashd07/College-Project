import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
    adminName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Admin = model('Admin', adminSchema);

export default Admin;
