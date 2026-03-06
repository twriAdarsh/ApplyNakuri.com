import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'


export const UpdateJob = () => {

    const {id} = useParams();
    const [job, setJob] = useState()

    const initialValue = []

    useEffect(() => {
        fetch(`http://localhost:8080/jobs/current-job/${id}`)
            .then((res) => res.json())
            .then((result) => {
                setJob(result);
                initialValue = [{
                    jobTitle: result.jobTitle,
                    employmentType: result.employmentType,
                    location: result.location,
                    salary: result.salary,
                    description: result.description,
                    applicationForm: result.applicationForm,
                }]
            })
            .catch((error) => {
                console.log(error);
            });
    },[]);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues:{
           initialValue
        }
    })

    useEffect(()=> {
        fetch(`http://localhost:8080/jobs/current-job/${id}`)
            .then((res) => res.json())
            .then((result) => {
                setJob(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const onSubmit = (data) =>{ 
        console.log(data)
        
        // send data to backend API
        fetch("http://localhost:8080/jobs/post-job", {
            method: "POST",
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            toast.success("Job Updated Successfully")
            window.location.href = '/all-jobs';
        })
        .catch((error) => {
            console.log(error);
            toast.error("Failed to update job");
        });

    }

    // DYNAMIC CANDIDATE FORM QUESTION
    const [questions, setQuestions] = useState([{ question: '', answer: '' }]);
    const [questionSize, setQuestionSize] = useState(0);
    const addQuestion = () => {
        setQuestionSize(questionSize+1);
        setQuestions([...questions, { question: '', answer: '' }]);
    };
    const handleDeleteQuestion = (index) => {
        const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
        setQuestions(newQuestions);
        setQuestionSize(questionSize-1);
    };


    return (
        <div className='max-w-screen-2xl container mt-6 mx-auto xl:px-24 px-4'>
            <div className='bg-white py-8 px-6 lg:px-16 rounded-xl shadow-xl border border-gray-100'>

                <h2 className='text-2xl font-bold text-center text-gray-800 mb-8 tracking-tight'>Update Job Posting</h2>

                {/* FORM */}
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='flex flex-col lg:flex-row gap-10'>

                        {/* JOB POSTING DETAILS */}
                        <div className='lg:w-1/2 w-full'>
                            <div className='mb-4 pb-2 border-b-2 border-secondary'><h1 className='text-lg font-bold text-secondary'>Job Details</h1></div>
                            <div className='mb-4'>
                                <label className='block mb-1.5 text-sm font-semibold text-gray-700'>Job Title</label>
                                <input type='text' required {...register("jobTitle")} placeholder='Ex: Full Stack Developer' className='create-job-input placeholder:text-sm'></input>
                            </div>
                            <div className='mb-4'>
                                <label className='block mb-1.5 text-sm font-semibold text-gray-700'>Employment Type</label>
                                <input type='text' required {...register("employmentType")} placeholder='Ex: Internship, Part Time, Full Time' className='create-job-input placeholder:text-sm'></input>
                            </div>
                            <div className='mb-4'>
                                <label className='block mb-1.5 text-sm font-semibold text-gray-700'>Location</label>
                                <input type='text' required {...register("location")} placeholder='Ex: Hyderabad' className='create-job-input placeholder:text-sm'></input>
                            </div>
                            <div className='mb-4'>
                                <label className='block mb-1.5 text-sm font-semibold text-gray-700'>Expected Salary <span className='text-xs font-normal text-gray-500'>(in LPA)</span></label>
                                <input type='text' required {...register("salary")} placeholder='Ex: 20' className='create-job-input placeholder:text-sm'></input>
                            </div>
                            <div className='mb-4'>
                                <label className='block mb-1.5 text-sm font-semibold text-gray-700'>Job Description</label>
                                <textarea className='create-job-input placeholder:text-sm' rows={4} placeholder='Job Description and Requirements' required {...register("description")} />
                            </div>
                        </div>

                        {/* CANDIDATE FORM */}
                        <div className='lg:w-1/2 w-full'>
                            <div className='mb-4 pb-2 border-b-2 border-secondary'><h1 className='text-lg font-bold text-secondary'>Candidate Form</h1></div>



                            {/* DYNAMIC BLOCK */}
                            <div>
                                {questions.map((question, index) => (

                                    <div key={index} className='mb-4'>
                                            <label className='block mb-1.5 text-sm font-semibold text-gray-700'>Question {`${index+1}`}</label>
                                            <div className='mb-2 grid grid-cols-1 md:grid-cols-2 gap-2'>
                                                <input type='text' required {...register(`applicationForm.question.${index}`)} placeholder={`Question ${index + 1}`} className='create-job-input placeholder:text-sm' ></input>

                                                <div className='grid grid-cols-3 items-center justify-items-center my-2 md:my-0' >
                                                    <div className='flex items-center gap-1'>
                                                        <input {...register(`applicationForm.answer.${index}`, { required: true })} type="radio" value="Yes" className='w-4 h-4 accent-secondary' />
                                                        <p className='text-sm font-medium text-gray-700'>Yes</p>
                                                    </div>
                                                    <div className='flex items-center gap-1'>
                                                        <input {...register(`applicationForm.answer.${index}`, { required: true })} type="radio" value="No" className='w-4 h-4 accent-secondary' />
                                                        <p className='text-sm font-medium text-gray-700'>No</p>
                                                    </div>
                                                    <div onClick={() => handleDeleteQuestion(index)} className='cursor-pointer p-1.5 rounded-lg hover:bg-red-50 transition-colors'>
                                                        <box-icon size='sm' name='trash' color='#ef4444'/>
                                                    </div>
                                                </div>

                                            </div>
                                    </div>
                                ))}
                            </div>
                                <button onClick={addQuestion} className={`${questionSize === 4? `hidden` : ``} block border-2 border-dashed border-gray-300 bg-transparent text-gray-600 text-sm font-semibold py-3 px-12 md:px-16 rounded-lg mt-4 md:mt-8 mx-auto hover:border-secondary hover:text-secondary transition-colors duration-200`}>+ Add More Questions</button>
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className='flex justify-center my-8'>
                        <button className='block bg-secondary hover:bg-[#065e46] text-white text-base font-semibold py-3.5 px-20 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200'>Update Job Post</button>
                    </div>
                </form>

            </div>
        </div>
    )
}
