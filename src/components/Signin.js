import React, { useState } from 'react'
import './css/Signin.css'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { API } from '../config'


function Signin() {
  
  const [values, setValues] = useState({
    email: 'asdf1234@gmail.com',
    password: 'asdf1234',
  })

  const { email, password } = values

  const handleChange = name => event => {
    setValues({
      ...values, 
      [name]: event.target.value
    })
  }

  const clickSubmit = event => {
    event.preventDefault()
    signin( email, password )
  }

  function signin(email, password) {
    axios.post(`${API}/signin`, 
      { email, password }, 
      { withCredentials: true, crossDomain: true })
        .then(res => {
          const data = { id: res.data.id, name: res.data.name }
          localStorage.setItem('Soomgo', JSON.stringify(data))
          window.location.replace('/')
        })
        .catch(err => {
          console.log(err)
        })
  }


  return (
    <div className="login-form">
      <h1>숨고에 오신 것을 환영합니다</h1>
      <form className='loginForm'action="/login" method="POST">
        <label className="title">이메일</label>
        <input
          type="email"
          className="input-box"
          placeholder="이메일을 입력하세요"
          name="email"
          onChange={handleChange('email')} 
          value={email}
        />
        <label className="title">비밀번호</label>
        <div className="password__input">
          <input
            type="password"
            className="input-box"
            placeholder="영문자와 숫자를 포함하여 8자 이상"
            name="password"
            onChange={handleChange('password')} 
            value={password}
          />
        </div>
        <a href="/" className="small findPassword"> 비밀번호 찾기 </a>
        <button onClick={clickSubmit} type="submit" className="login-btn new-btn">로그인</button>
        <button className="login-btn facebook-btn">페이스북으로 로그인</button>
      </form>
      <a href="/signin" className="noId">계정이 없으신가요?</a>
    </div>
  )
}

export default Signin
