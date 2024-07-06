import { Schema, model } from 'mongoose';

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: [String],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'NGO',
        // required: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    applicationDeadline: {
        type: Date,
        required: true
    },
    applicants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Job = model('Job', jobSchema);

export default Job;
