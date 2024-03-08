import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Search() {
    const [results, setSearchResult] = useState(null);
    const { keyword } = useParams();

    useEffect({
        
    })
  return (
    <div>
        <Link to='/'>back</Link>
        Search
    </div>
  )
}

export default Search