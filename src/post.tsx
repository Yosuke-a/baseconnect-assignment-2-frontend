import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJobs } from './api';

interface job_mold {
  id: number;
  name: string;
  category: string;
  income: number;
}

interface PostJobProps {
  setjob: (job_status: job_mold) => void; 
  new_job: job_mold[];
}

const PostJob: React.FC<PostJobProps> = ({ setjob }) => {
  const [name, setName] = useState('');
  const [income, setIncome] = useState('');
  const [category, setCategory] = useState('エンジニア');
  const navigate = useNavigate();

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newJob: Omit<job_mold, 'id'> = {
        name: name,
        category,
        income: Number(income),
      };

      const createdJob = await createJobs(newJob);

      setjob(createdJob);

      setName('');
      setIncome('');
      setCategory('エンジニア');

      navigate('/');
    } catch (error) {
      console.error('Error while creating job:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">求人投稿ページ</h1>
      <form onSubmit={handlePost} className="flex flex-col gap-4">
        <label>
          求人タイトル:
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="求人タイトルを入力"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          年収（万円）:
          <input
            type="number"
            className="border p-2 w-full"
            placeholder="年収を入力"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </label>
        <label>
          カテゴリー:
          <select
            className="border p-2 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="エンジニア">エンジニア</option>
            <option value="事務">事務</option>
            <option value="営業">営業</option>
            <option value="デザイン">デザイン</option>
            <option value="マーケティング">マーケティング</option>
            <option value="財務・経理">財務・経理</option>
            <option value="人事">人事</option>
            <option value="カスタマーサポート">カスタマーサポート</option>
            <option value="製造">製造</option>
            <option value="医療・介護">医療・介護</option>
          </select>
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          投稿する
        </button>
      </form>
    </div>
  );
};

export default PostJob;
