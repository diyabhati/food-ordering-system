import React, { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import {
  getAll,
  getAllByTag,
  getAllTags,
  search,
} from '../../services/foodService';
import NotFound from '../../components/NotFound/NotFound';
import "./homePage.css"

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload };
    case 'TAGS_LOADED':
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
  const { searchTerm, tag } = useParams();

  const [view, setView ] = useState(true);
  const [table,setTable] = useState(0);

  
  const user = localStorage.getItem('user')
  const tableN = localStorage.getItem('table');
  useEffect(() => {
    getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED', payload: tags }));

    const loadFoods = tag
      ? getAllByTag(tag)
      : searchTerm
      ? search(searchTerm)
      : getAll();

    loadFoods.then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods }));
 
    if(!user){
        setView(false)
    }

    if(tableN){
      setView(false)
    }
  }, [searchTerm, tag,user]);


  const handleClick = () => {
    localStorage.setItem('table',table)
        setView(false)
  }


  return (
    <>
        {
        view && <div className='modal'>
          <p className='modalHeader'>Enter Table Number</p>
          <div className='inputWrapper'>
          <input type='text' placeholder='Enter Table Number' className='modalInput' onChange={(e)=>setTable(e.target.value)}/>
          <button className='modalButton' onClick={handleClick}>OK</button>
          </div>
          </div>
          }

      <Search />
      <Tags tags={tags} />
      {foods.length === 0 && <NotFound linkText="Reset Search" />}
      <Thumbnails foods={foods} />
    </>
  );
}
