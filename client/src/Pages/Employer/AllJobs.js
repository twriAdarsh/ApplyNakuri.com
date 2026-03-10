import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const AllJobs = () => {

    const tableHeaderCss = "px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider bg-gray-50 border-b-2 border-gray-200"
    
    const [jobs, setJobs] = useState([]);

    useEffect( ()=>{
        try {
            fetch("http://localhost:8080/jobs/all-jobs")
                .then(res => res.json())
                .then(data => {
                    const newData = data.slice(0, 6);
                    setJobs(newData);
                });
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }

    }, [] )
    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>

            <div className='py-6'>
                <div className='w-full'>

                    {/* MAIN TABLE */}
                    <section className="py-4">
                        <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto mt-10">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-xl overflow-hidden">
                                <div className="rounded-t-xl mb-0 px-6 py-5 border-0 bg-secondary text-white">
                                    <div className="flex flex-wrap items-center justify-between">
                                        <h3 className="font-bold text-xl tracking-wide">All Posted Jobs</h3>
                                        <span className='text-sm font-medium opacity-90'>{jobs.length} jobs listed</span>
                                    </div>
                                </div>

                                <div className="block w-full overflow-x-auto">
                                    <table className="items-center bg-transparent w-full border-collapse">
                                        <thead>
                                            <tr>
                                                <th className={tableHeaderCss}>Job Title</th>
                                                <th className={`${tableHeaderCss} hidden md:table-cell`}>Location</th>
                                                <th className={`${tableHeaderCss} hidden md:table-cell`}>Salary</th>
                                                <th className={`${tableHeaderCss} text-center`}>Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-100">
                                            {jobs.map((job, key) => <RenderTableRows key={key} job={job} />)}
                                        </tbody>

                                    </table>
                                    {jobs.length === 0 && (
                                        <div className='text-center py-12 text-gray-400 text-lg font-medium'>No jobs posted yet</div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </section>
                </div>
            </div>
        </div>
    )
}
function HandlerDeleteJob(id){
    try {
        fetch(`http://localhost:8080/jobs/delete-job/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            // Handle the response data here
            toast.success("Deleted successfully")
        });
    } catch (error) {
        console.error("Error deleting job:", error);
        toast.error("Unable to delete")
    }
}


function RenderTableRows({job}){
    const tableDataCss = "px-6 py-4 align-middle text-sm font-medium text-gray-700 whitespace-nowrap"
    return (

        <tr className='hover:bg-gray-50 transition-colors duration-150'>
            <td className={`${tableDataCss} text-left px-3 md:px-6 font-semibold text-gray-900`}>
                {job.jobTitle}
            </td>
            <td className={`${tableDataCss} hidden md:table-cell`}>
                {job.location}
            </td>
            <td className={`${tableDataCss} hidden md:table-cell`}>
                <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-50 text-green-700'>
                    {job.salary} LPA
                </span>
            </td>
            <td className={`${tableDataCss}`}>
                <div className='flex justify-center gap-3'>
                <button className='p-2 rounded-lg hover:bg-blue-50 transition-colors duration-150' title='Edit'>
                    <box-icon name='edit' color='#3b82f6' size='sm'/>
                </button>
                <button className='p-2 rounded-lg hover:bg-red-50 transition-colors duration-150' title='Delete'>
                    <box-icon name='trash' color='#ef4444' size='sm' onClick={() => HandlerDeleteJob(job._id)} />
                </button>
                </div>
            </td>
        </tr>
    )
}