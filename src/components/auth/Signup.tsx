import { Form, Formik, FormikHelpers, Field, ErrorMessage } from 'formik'
import React from 'react'
import "./style/signup.css"
import * as Yup from 'yup'
import {Navigate, useNavigate} from 'react-router-dom';
import { signup } from '../database/auth';



export type signupValueType={
  username:string;
  password:string;
  confirmpassword: string;
  bio:string;
  name:string
}

const validScheme = Yup.object({
  username: Yup.string().required("Required"),
  password: Yup.string().required('Required'),
  confirmpassword: Yup.string().required("Required")
})



function Signup() {

  let navigate = useNavigate();
  

  const initialValues:signupValueType = {
    username:"",
    password:'',
    confirmpassword:'',
    name:'',
    bio:''
  }

  const onSubmit = (values:signupValueType, actions:FormikHelpers<signupValueType>)=>{
      
      
      signup(values);
      
      navigate('/login')
  }

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      <Formik initialValues={initialValues} validationSchema={validScheme} onSubmit={(values, actions)=>{onSubmit(values, actions)}}>
        <Form className='signup-form'>
          <div className="form-container">
            <div className="field-container">
              <Field required='on' placeholder='Username' autoComplete='off' className='field' id='username' name='username'/>
              <ErrorMessage className='error' name='username' />
            </div>
            <div className="field-container">
              <Field placeholder="Name"  autoComplete='off' className='field' id='name' name='name'/>
              <ErrorMessage className='error' name='name' />
            </div>
            <div className="field-container">
              <Field placeholder="bio"  autoComplete='off' className='field' id='bio' name='bio'/>
              <ErrorMessage className='error' name='bio' />
            </div>
            <div className="field-container">
              <Field placeholder="Password" type="password" autoComplete='off' className='field' id='password' name='password'/>
              <ErrorMessage className='error' name='password' />
            </div>
            <div className="field-container">
              <Field placeholder='Confirm Password' type="password" autoComplete='off' className='field' id='confirmpassword' name='confirmpassword'/>
              <ErrorMessage className='error' name='confirmpassword' />
            </div>
          </div>
          <button type='submit' className="signup-btn">Sign Up</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Signup
