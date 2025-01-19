import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './header';
import { Choose_Category } from './choose_category';
import { Select_income } from './income';
import { Jobcard } from './job_card';
import PostJob from './post';
import { getJobs } from './api';

interface job_mold {
  id: number;
  name: string; 
  category: string;
  income: number;
}

function App() {
  const category_list = [
    { id: 1, name: '事務' },
    { id: 2, name: 'エンジニア' },
    { id: 3, name: '営業' },
    { id: 4, name: 'マーケティング' },
    { id: 5, name: '財務・経理' },
    { id: 6, name: '人事' },
    { id: 7, name: 'カスタマーサービス' },
    { id: 8, name: '製造' },
    { id: 9, name: '医療・介護' },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobData = await getJobs();
        setjob(jobData);
      } catch (error) {
        console.error('Error while fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const [job, setjob] = useState<job_mold[]>([]);

  const add_job = (job_status: job_mold) => {
    setjob((prevJobs) => [...prevJobs, job_status]);
  };

  const [boxstate, boxChecker] = React.useState(
    category_list.reduce((acc, category) => {
      acc[category.name] = false;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const boxCheckfunc = (key: string, state: boolean) => {
    boxChecker((prev) => ({
      ...prev,
      [key]: state,
    }));
  };

  const [selectedIncome, setSelectedIncome] = React.useState<string>('0');

  const setIncome_func = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIncome(e.target.value);
  };

  const job_sort = () => {
    const box_value = Object.values(boxstate).includes(true);

    if (box_value) {
      const activeCategories = Object.entries(boxstate)
        .filter(([, value]) => value)
        .map(([key]) => key);
      return job.filter(
        (job) =>
          activeCategories.includes(job.category) &&
          job.income >= parseInt(selectedIncome)
      );
    }

    return job.filter((job) => job.income >= parseInt(selectedIncome));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex">
              <div className="bg-slate-300 h-screen w-1/4">
                <Choose_Category
                  categories={category_list}
                  boxstate={boxstate}
                  boxcheck={boxCheckfunc}
                />
                <Select_income
                  selectedIncome={selectedIncome}
                  setIncome_func={setIncome_func}
                />
              </div>

              <div className="w-3/4 ">
                <h1>求人一覧</h1>
                <h1>該当件数: {job_sort().length}</h1>
                <Jobcard jobs={job_sort()} />
              </div>
            </div>
          }
        />
        <Route path="/post" element={<PostJob setjob={add_job} new_job={job} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
