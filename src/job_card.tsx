import React from 'react';

type job_props = {
    id: number;
    title: string;
    category: string;
    income: number;
};

type jobs_props = {
    jobs: job_props[]
};


export const Jobcard = ( props: jobs_props ) => {
    return (
        <>
        <div>
        {props.jobs.map((job) => (
            <div key={job.id} className="p-4 border rounded shadow-md mb-4">
                <h5>{ job.title }</h5>
                <h1>カテゴリー: { job.category }</h1>
                <h1>年収: { job.income }万円</h1>
            </div>
        ))}
        </div>
        </>
    );
}