import React from 'react';
type income_props = {
    selectedIncome: string;
    setIncome_func: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};


export const Select_income: React.FC<income_props> = ({ selectedIncome, setIncome_func }) => {
    return(
        <>
        <h1>年収</h1>
        <select value={ selectedIncome } onChange={ setIncome_func }>
            <option value="300">300万円以上</option>
            <option value="500">500万円以上</option>
            <option value="700">700万円以上</option>
            <option value="1000">1000万円以上</option>
        </select>
        </>
    );
}