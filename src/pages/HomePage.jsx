import React from 'react';
import { Link } from 'react-router';

function HomePage() {
    return (
        <div className="p-4 min-h-screen flex flex-col items-center justify-center overflow-hidden">
            <h1 className="text-3xl font-bold mb-6 text-center">Welcome to JobApp</h1>

            <div className="space-x-4 mb-6 text-center">
                <Link to="/login" className="text-blue-500 hover:underline">Login</Link> |  
                <Link to="/register" className="text-blue-500 hover:underline">Register</Link> | 
                <Link to="/jobs" className="text-blue-500 hover:underline">Browse Jobs</Link>
            </div>

            {/* Jobseeker illustration */}
            <div className="mt-4 flex justify-center">
                <img 
                    src="/jobseeker.svg" 
                    alt="Jobseeker illustration: browse and apply for jobs" 
                    className="max-h-[40vh] w-auto object-contain" 
                />
            </div>
        </div>
    );
}

export default HomePage;
