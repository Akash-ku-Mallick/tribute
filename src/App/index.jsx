import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './styles.css'

import { FindID } from '../../utils/fetchDB'


const App = () => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('loading');
    // loading, failed, successful, invalid
    const { name } = useParams();

    useEffect(() => {
        fetchData()
    }, [name]);

    const fetchData = async () => {
        if(typeof(name) !== 'undefined') {
            FindID(name).then(res => {
                console.log(res);
                setData(res.data.record);
                setStatus('successful')
            })
            .catch(err => {
                console.warn(err);
                setStatus('failed');
            })
        }
        else{
            setStatus('invalid');
        }
    }

    if(status === 'failed'){
        return (
            <div className='container'>
            <header>

            </header>
            <h1>400</h1>
            <h2>Sorry We do not have any information</h2>
            <Link to={'../../'} >Go Home</Link>
            <footer>
                created by <a href="https://www.linkedin.com/in/akash-mallick" target="_blank"><strong>Akash Kumar</strong></a>
            </footer>
        </div>
        )      
    }
    else if(status === 'invalid'){
        return (
            <div className='container'>
            <header>

            </header>
            <h1>404</h1>
            <h3>Sorry, It seems like an invalid request</h3>
            <Link to={'../../'}>Go Home</Link>
            <footer>
                created by <a href="https://www.linkedin.com/in/akash-mallick" target="_blank"><strong>Akash Kumar</strong></a>
            </footer>
        </div>
        )
    }
    else if(data!==null){
        return(
        <div className='container'>
            <header>
                <h1>
                    {
                        data.name ? data.name : 'Title'
                    }
                </h1>
                <h2>
                    {
                        data.subtitle ? data.subtitle : "Subtitle"
                    }
                </h2>
            </header>
            <div id='context'>
                {
                    data.cover ?
                    <div id='cover'>
                        <img src={data.cover} alt='cover image' />
                        <h3>"{data.quote && data.quote}"</h3>
                    </div>
                    : null
                }
                <div className='context'>
                <p>{ data.introduction && data.introduction }</p>
                {
                    data.about && data.about !== null  ? data.about.map((item)=>{
                        return (<Item i={item}/>)
                    })
                    : null
                }
                </div>
            </div>
            <footer>
                created by <a href="https://www.linkedin.com/in/akash-mallick" target="_blank"><strong>Akash Kumar</strong></a>
            </footer>
        </div>
        )
    }
    else {
        return <div className='container'>
            <header>

            </header>
            <h2>loading...</h2>
            <footer>
                created by <a href="https://www.linkedin.com/in/akash-mallick" target="_blank"><strong>Akash Kumar</strong></a>
            </footer>
        </div>
    }
}

const Item = (i) => {
    return (
        <div className='item'>
            <h3>{i.i.heading}</h3>
            <hr/>
            <div className='wrapper'>
            <span>{i.i.content}</span>
            {
                i.i.images && <img src={i.i.images} alt='info image' />
            }
            </div>
        </div>
    )
};

export default App
