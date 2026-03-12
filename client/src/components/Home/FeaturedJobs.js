import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoURL from '../../assets/img/logo.jpeg'

export const FeaturedJobs = () => {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        console.log("hello");
        fetch("http://localhost:8080/jobs/all-jobs").then(res => res.json()).then(
            data => setJobs(data)
        );
    }, []);

    return (
        <div className='py-10'>
            <h2 className='text-center text-2xl md:text-3xl font-bold text-primary mb-2'>Our Featured Jobs</h2>
            <p className='text-center text-gray-500 mb-8'>Discover opportunities that match your skills</p>
            {jobs.length > 0 ? (
                <div className='w-full grid sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {jobs.map((job, key) => <Card key={key} job={job} />)}
                </div>
            ) : (
                <div className='text-center py-16'>
                    <box-icon name='briefcase-alt-2' size='48px' color='#ccc'></box-icon>
                    <p className='text-gray-400 mt-4 text-lg'>No featured jobs available right now.</p>
                    <p className='text-gray-400 text-sm'>Check back soon for new opportunities!</p>
                </div>
            )}
        </div>
    )
}

function Card({ job }) {
    return (
        <div className='border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 card'>
            {/* Card Header */}
            <div className='flex items-center gap-3'>
                <div>
                    {/* company image */}
                    <img src={logoURL} alt={job.companyName} className='w-12 rounded-full' />
                </div>
                <div>
                    <div className='flex items-center'>
                        <box-icon size='18px' name='time'></box-icon>
                        <span className='pl-1'>{job.employmentType} </span>
                    </div>
                    <h1 className='font-bold text-md lg:text-lg'>{job.jobTitle}</h1>
                </div>
            </div>
            <div>
                <p className='text-sm py-4'>{job.description}</p>
            </div>
            {/* Footer - apply now and location */}
            <div className='flex justify-between items-center'>
                <div className='flex justify-center items-center'>
                    <box-icon size='19px' name='pin'></box-icon>
                    <span className='pl-2'>{job.location} </span>
                </div>
                <Link to={`/current-job/${job._id}`}>
                    <button className='hidden lg:block bg-primary text-white text-sm py-1 px-4 rounded-md'>Apply Now</button>
                </Link>
                            
            </div>
        </div>
    )
}