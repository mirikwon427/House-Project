import {useState, useEffect} from 'react'
import axios from 'axios';
import CInput from '../components/common/CInput';
import { useInput } from '../hooks/useInput';
import CButton from '../components/common/CButton';

export default function LogIn() {

    const {id} = useInput('')
    const {pw} = useInput('')

    const onClickLogin = () => {
        
        console.log('login clicked')
        axios.post('/login', null, {
            params: {
                'user_id' : id.value,
                'user_pw' : pw.value
            }
        })
        .then(res => {
            console.log('===================== 리스폰스')
            // jwt 토큰 저장하는 코드 추가
            if (res.data.success === true) {
                console.log('======================','로그인 성공')
                sessionStorage.setItem('user_id', res.data.userId)
                document.location.href = '/'
            } else {
                if (res.data.userId === undefined){
                    console.log(res.data.msg)
                } else {
                    console.log(res.data.msg)
                }
            }
        })
        .catch()
    }

    useEffect( () => {
        // useEffect 이용해서 axios 요청하면 bad Request를 얻는다.
        // 버튼 클릭으로 요청하면 멀쩡하게 잘 요청한다. msw를 사용해서 그런 것 같은데
        // 실제 서버를 활용했을 때도 그런지 나중에 확인하자.
        async function get() {
            const result = await axios.get('/api/hello')

            console.log(result);
            
        }
        get()
    }, [])

    return (
        <>
          <div className=" flex items-center justify-center">
            <div className= "mb-8 text-8xl font-bold">
              <h3 className= "text-3xl text-gray-800">Log in</h3>
              <form className="flex flex-col mt-5 px-5">
                {/* <input placeholder= "Email" type='text' name='input_id' value={inputId} onChange={handleInputId} className="bg-gray-100 shadow-inner focus:outline-none border-2 focus:border-opacity-50 focus:border-green-600 mb-3 py-3 px-5 rounded-lg"/>
                <input placeholder= "Password" type='password' name='input_pw' value={inputPw} onChange={handleInputPw} className="bg-gray-100 shadow-inner focus:outline-none border-2 focus:border-opacity-50 focus:border-green-600 py-3 px-5 rounded-lg"/> */}
                <CInput {...id} type='text' placeholder="Email"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </CInput>
                <CInput {...pw} type='password' placeholder="Password"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                </CInput>
                <button className="py-3 px-5 bg-gray-800 text-white mt-3 text-lg rounded-lg focus:outline-none hover:opacity-90" type='button' onClick={onClickLogin}>Log In</button>
                {/* <CButton>Cbutton</CButton> 모양이 이쁘지가 않음*/}
                </form>
            </div>
          </div>
        </>

    );
}