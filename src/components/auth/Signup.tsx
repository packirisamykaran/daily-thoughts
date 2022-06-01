import { Form, Formik, FormikHelpers, Field, ErrorMessage } from 'formik'
import React from 'react'
import "./style/signup.css"
import * as Yup from 'yup'
import { useNavigate} from 'react-router-dom';
import { checkUsernameExists, signup } from '../database/auth';



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

const validate = async (values:signupValueType) =>{
  
  let error:any = {
  };


  // check if password is matches
  if(values.password !== values.confirmpassword){
    error.confirmpassword= 'Password does not match'
  }


  // Username exist check
  if(values.username!==''){
    const userExist = await checkUsernameExists(values.username);
    if(userExist){
      error.username = "Username Taken"
  }
  }

  return error;
  
}



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
      navigate('../login')
      
  }

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      <Formik initialValues={initialValues}  validate={(values:signupValueType) =>validate(values)} validationSchema={validScheme} onSubmit={(values, actions)=>{onSubmit(values, actions)}}>
        {
          (fomrikProps)=>{
           
            return (
              <Form  className='signup-form'>
                <div className="form-container">
                  <div className="field-container">
                    <Field  name='username' required='on'  placeholder='Username'  autoComplete='off' className='field' id='username'/>
                    <ErrorMessage className='error' name='username' />
                  </div>
                  <div className="field-container">
                    <Field placeholder="Name"  autoComplete='off' className='field' id='name' name='name' />
                    <ErrorMessage className='error' name='name' />
                  </div>
                  <div className="field-container">
                    <Field placeholder="bio"  autoComplete='off' className='field' id='bio' name='bio'/>
                    <ErrorMessage className='error' name='bio' />
                  </div>
                  <div className="field-container">
                    <Field placeholder="Password"  required='on' type="password" autoComplete='off' className='field' id='password' name='password'/>
                    <ErrorMessage className='error' name='password' />
                  </div>
                  <div className="field-container">
                    <Field placeholder='Confirm Password' required='on' type="password" autoComplete='off' className='field' id='confirmpassword' name='confirmpassword'/>
                    <ErrorMessage className='error' name='confirmpassword' />
                  </div>
                </div>
                <button type='submit' className="signup-btn">Sign Up</button>
              </Form>
            )
          }
        }
      </Formik>
    </div>
  )
}

export default Signup
