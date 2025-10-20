import React from 'react';
import { useLoaderData, Link } from 'react-router';

function ApplicationsPage() {
    const data = useLoaderData();
    // Sample fallback applications for development/demo
    const sampleApplications = [
        {
            _id: 'app-1',
            jobTitle: 'Frontend Developer',
            jobCompany: 'Acme Corp',
            status: 'Under Review',
            createdAt: new Date().toISOString(),
            coverLetter: 'Excited to apply for this role and contribute to the frontend team.'
        },
        {
            _id: 'app-2',
            jobTitle: 'Backend Engineer',
            jobCompany: 'TechWave',
            status: 'Interview Scheduled',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            coverLetter: 'I have experience building scalable APIs and would love to join.'
        }
    ];

    const applications = (data?.applications && data.applications.length > 0) ? data.applications : sampleApplications;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
                    <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-500">← Back to Dashboard</Link>
                </div>

                {applications.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">You have not applied to any jobs yet.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {applications.map((app) => (
                            <div key={app._id} className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{app.jobTitle || app.job?.title || 'Job'}</h3>
                                <p className="text-gray-600 mb-2">Company: {app.jobCompany || app.job?.company || 'N/A'}</p>
                                <p className="text-gray-600 mb-2">Status: {app.status || 'N/A'}</p>
                                <p className="text-sm text-gray-500 mb-4">Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
                                <Link to={`/applications/${app._id}`} className="text-indigo-600 hover:text-indigo-500">View details</Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ApplicationsPage;
