import {useState, useEffect} from 'react'
import axios from 'axios';


export default function LogIn() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
    
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    const onClickLogin = () => {
        console.log('login clicked')
        axios.post('/api/user_inform', null, {
            params: {
                'user_id' : inputId,
                'user_pw' : inputPw
            }
        })
        // axios.get('/api/user_inform')
        .then(res => console.log(res))
        .catch()
    }

    useEffect(() => {
        axios.get('/api/hello')
        .then(res => console.log(res))
        .catch()
    }, [])

    return (
        <>
            <h2>login</h2>
            <div>
                <label>ID: </label>
                <input type='text' name='input_id' value={inputId} onChange={handleInputId}/>
            </div>
            <div>
                <label>PW: </label>
                <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw}/>
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>Log In</button>
            </div>
        </>

    );
}