import React from 'react';
import { useLoaderData, Link } from 'react-router';

function ApplicationDetailPage() {
    const data = useLoaderData();
    const app = data?.application || data;

    if (!app) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Application not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Application Details</h1>
                    <Link to="/applications" className="text-indigo-600 hover:text-indigo-500">← Back to Applications</Link>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-2">{app.jobTitle || app.job?.title || 'Job'}</h2>
                    <p className="text-gray-600 mb-2">Company: {app.jobCompany || app.job?.company || 'N/A'}</p>
                    <p className="text-gray-600 mb-2">Status: {app.status || 'N/A'}</p>
                    <p className="text-gray-600 mb-4">Applied on: {new Date(app.createdAt).toLocaleDateString()}</p>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Cover Letter</h3>
                        <p className="text-gray-700 whitespace-pre-line">{app.coverLetter || app.notes || '—'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApplicationDetailPage;
