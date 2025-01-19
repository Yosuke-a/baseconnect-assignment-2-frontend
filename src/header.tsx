import React from 'react';
import { Link } from 'react-router-dom'; 

const Header = () => {
  return (
    <header className="bg-blue-900 relative flex items-center justify-between p-4">
      <h1 className="text-white">求人検索アプリ</h1>
      <div className="flex absolute right-4 gap-3 text-white">
        <Link to="/">求人検索</Link> 
        <Link to="/post">求人投稿</Link> 
      </div>
    </header>
  );
};

export default Header;
