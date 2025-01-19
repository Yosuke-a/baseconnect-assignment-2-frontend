
import React from 'react';
type category_props = {
    id: number;
    name: string;
};

type categories_props = {
    categories: category_props[];
    boxstate: {[key: string]: boolean};
    boxcheck: (key: string, state: boolean) => void;
};

export const Choose_Category = (props: categories_props) => {
    const {boxstate, boxcheck} = props;
    return(
    <>
        <h1>求人カテゴリ</h1>
       { props.categories.map((category) => 
        <div key={category.id}>
        <label>
        <input 
            type="checkbox" 
            checked={boxstate[category.name]}
            onChange={(e) => boxcheck(category.name, e.target.checked)}
        />{category.name}
        </label>
        </div>
    )}
    </>
    );
};