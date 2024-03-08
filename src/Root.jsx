import React, { useState, useEffect } from 'react'

import './Root.css'
import { Outlet, useNavigate  } from 'react-router-dom'

import { getList } from '../utils/fetchDB';
import { fetchDataAndCache } from '../utils/caches';

function Root() {
  const[ Entry, setEntry] = useState('');
  const [keys, setKeys] = useState(null);
  const [listAvailable, setListAvailability] = useState(false);

  const navigate = useNavigate();

  useEffect(() =>{
    fetchDataAndCache().then(function(data){
      console.log(data);
      setKeys(data); 
      setListAvailability(true);
    })
    .catch((error) => {
      console.warn(error);
      SetSearchKeys();
    })
  }, []);

  const SetSearchKeys = async () => {
    getList().then((results)=> {
      setKeys(results);
      setListAvailability(true);
    }).catch(function (err) {
      setListAvailability(false);
    });
  }

  const handleSearch = (event) => {
    if(Entry.length > 0){
    navigate(`/about/${Entry}`);
    }
    else {
      alert("Please select an entry to search for...");
    }
  }

  return (
    <div className='container'>
      <header>
        <h1>Tribute</h1>
        <div className='search_wraper'>
          <input type="text" list={listAvailable?"d_l":null} 
          placeholder='Search..' value={Entry}
          onChange={(e)=>{setEntry(e.target.value)}}/>
          {keys ? <datalist id="d_l">
             {
              keys.map(function(key) {
                return<option key={key.id} value={key.name} />
              })
            } 
          </datalist> : null}
          
          <button onClick={(e)=>{handleSearch(e)}}>
            <SearchBTN />
          </button>
        </div>
      </header>
      <Outlet />
      <div>
        <h3>Creator's Favourite</h3>
      </div>
      <div>
        <h3>Most Search</h3>
      </div>
      <footer>
        created by <a href="https://www.linkedin.com/in/akash-mallick" target="_blank"><strong>Akash Kumar</strong></a>
      </footer>
    </div>
  )
}

export default Root

const SearchBTN = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
        <path fill="white" d="M10.5 4a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13M2 10.5a8.5 8.5 0 1 1 15.176 5.262l3.652 3.652a1 1 0 0 1-1.414 1.414l-3.652-3.652A8.5 8.5 0 0 1 2 10.5M9.5 7a1 1 0 0 1 1-1a4.5 4.5 0 0 1 4.5 4.5a1 1 0 1 1-2 0A2.5 2.5 0 0 0 10.5 8a1 1 0 0 1-1-1" />
      </g>
    </svg>
  )
}