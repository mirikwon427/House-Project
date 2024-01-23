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
        // console.log('ID: ', inputId)
        // console.log('PW: ', inputPw)
        axios.post('/api/user_inform', null, {
            params: {
                'user_id' : inputId,
                'user_pw' : inputPw
            }
        })
        .then(res => {
            console.log('===================== 리스폰스')
            if (res.data.success === true) {
                console.log('======================','로그인 성공')
                sessionStorage.setItem('user_id', inputId)
            } else {
                if (res.data.userId === undefined){
                    console.log(res.data.msg)
                } else {
                    console.log(res.data.msg)
                }
            }
            document.location.hre = '/'
        })
        .catch()
    }

    useEffect(() => {
        // useEffect 이용해서 axios 요청하면 bad Request를 얻는다.
        // 버튼 클릭으로 요청하면 멀쩡하게 잘 요청한다. msw를 사용해서 그런 것 같은데
        // 실제 서버를 활용했을 때도 그런지 나중에 확인하자.
        // axios.get('/api/hello')
        // .then(res => console.log(res))
        // .catch()
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