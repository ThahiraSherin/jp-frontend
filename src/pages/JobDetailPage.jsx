import React, { useState } from 'react';
import { useLoaderData, Link } from 'react-router';
import { toast } from 'react-hot-toast';
import { applicationsAPI, jobsAPI } from '../services';

// job loader to fetch a single job by ID
const jobLoader = async ({ params }) => {
  try {
    const response = await jobsAPI.getJob(params.id);
    return response.data.job || response.data;
  } catch (error) {
    // If backend returns 404, return null and let the page render a friendly message.
    if (error.response?.status === 404) {
      return null;
    }
    // For other errors, rethrow to preserve error handling
    throw error;
  }
}

function JobDetailPage() {
  const loaderJob = useLoaderData();
  const [isApplying, setIsApplying] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);


if (!loaderJob) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Job not found</h1>
      <Link to="/jobs">Back to Jobs</Link>
    </div>
  );
}


  const job = loaderJob;

  const handleApply = async (event) => {
    event.preventDefault();
    setIsApplying(true);

    const formData = new FormData(event.target);

    try {
      await applicationsAPI.applyForJob(job._id, formData);
      toast.success('Application submitted successfully!');
      setShowApplyModal(false);
    } catch (error) {
      console.error('Application error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/jobs" className="text-indigo-600 hover:text-indigo-500">
            ← Back to Jobs
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
          <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
            <span>{job.company}</span>
            <span>•</span>
            <span>{job.location}</span>
            <span>•</span>
            <span className="capitalize">{job.jobType}</span>
            <span>•</span>
            <span className="capitalize">{job.experienceLevel}</span>
          </div>

          <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm mb-6">
            {job.category}
          </span>

          <h2 className="text-xl font-semibold text-gray-900 mb-3">Salary Range</h2>
          <p className="text-2xl font-bold text-green-600 mb-6">
            ${job.salary?.min?.toLocaleString()} - ${job.salary?.max?.toLocaleString()}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Job Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Responsibilities</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {(job.responsibilities || []).map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h3>
                <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Benefits</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {(job.benefits || []).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="bg-gray-50 border border-gray-100 p-4 rounded-md space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={job.logoUrl || '/vite.svg'}
                  alt={`${job.company} logo`}
                  className="w-16 h-16 object-contain rounded"
                />
                <div>
                  <div className="font-semibold">{job.company}</div>
                  <div className="text-sm text-gray-500">{job.location}</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600">Salary</div>
                <div className="font-bold text-green-600">
                  ${job.salary?.min?.toLocaleString()} - ${job.salary?.max?.toLocaleString()}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600">Job Type</div>
                <div className="inline-block mt-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  {job.jobType}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600">Experience</div>
                <div className="mt-1 text-sm text-gray-700 capitalize">{job.experienceLevel}</div>
              </div>

              <button
                onClick={() => setShowApplyModal(true)}
                className="w-full mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Apply Now
              </button>
            </aside>
          </div>

          <div className="border-t pt-6 flex justify-between items-center text-sm text-gray-500">
            <div>Posted: {new Date(job.createdAt).toLocaleDateString()}</div>
          </div>
        </div>

        {/* Apply Modal */}
        {showApplyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Apply for {job.title}</h3>
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Write a brief cover letter..."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                    Resume (PDF)
                  </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    disabled={isApplying}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isApplying}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {isApplying ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobDetailPage;



