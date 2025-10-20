import React from 'react';
import { useLoaderData, Link } from 'react-router';

function JobsPage() {
    const data = useLoaderData();
    // Sample fallback jobs to display when backend doesn't return any jobs (useful for dev/demo)
    const sampleJobs = [
        {
            _id: 'job-1',
            title: 'Frontend Developer',
            company: 'Acme Corp',
            location: 'Remote',
            jobType: 'full-time',
            description: 'Build beautiful and accessible user interfaces using React and Tailwind CSS.',
            salary: { min: 60000, max: 90000 },
            createdAt: new Date().toISOString(),
        },
        {
            _id: 'job-2',
            title: 'Backend Engineer',
            company: 'TechWave',
            location: 'New York, NY',
            jobType: 'full-time',
            description: 'Design and maintain scalable APIs and services using Node.js and PostgreSQL.',
            salary: { min: 80000, max: 120000 },
            createdAt: new Date().toISOString(),
        },
        {
            _id: 'job-3',
            title: 'Product Designer',
            company: 'Pixel Labs',
            location: 'San Francisco, CA',
            jobType: 'contract',
            description: 'Work on product UX, design systems and prototypes.',
            salary: { min: 50000, max: 85000 },
            createdAt: new Date().toISOString(),
        }
    ];

    const jobs = (data?.jobs && data.jobs.length > 0) ? data.jobs : sampleJobs;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
                    <Link
                        to="/dashboard"
                        className="text-indigo-600 hover:text-indigo-500"
                    >
                        ← Back to Home
                    </Link>
                </div>

                {jobs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No jobs available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {jobs.map((job) => (
                            <div key={job._id} className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {job.title}
                                </h3>
                                <p className="text-gray-600 mb-2">{job.company}</p>
                                <p className="text-gray-600 mb-2">{job.location}</p>
                                <p className="text-sm text-gray-500 mb-4">{job.jobType}</p>
                                <p className="text-gray-700 mb-4 line-clamp-3">
                                    {job.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-green-600 font-semibold">
                                        ${job.salary?.min?.toLocaleString()} - ${job.salary?.max?.toLocaleString()}
                                    </span>
                                    <Link
                                        to={`/jobs/${job._id}`}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default JobsPage;

