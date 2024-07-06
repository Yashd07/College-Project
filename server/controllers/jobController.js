import Job from '../models/jobs.js';

// Add Job
export async function addJob(req, res) {
    const {
        title,
        description,
        requirements,
        location,
        salary,
        company,
        applicationDeadline
    } = req.body;

    try {
        const newJob = new Job({
            title,
            description,
            requirements,
            location,
            salary,
            company,
            applicationDeadline
        });

        const job = await newJob.save();
        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// Get all Jobs
export async function getAllJobs(req, res) {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
