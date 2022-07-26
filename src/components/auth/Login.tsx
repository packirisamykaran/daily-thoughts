import './style/Login.css'
import   { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik'
import { useAppContext} from '../../contexts/AppProvider';
import { checkUsernamePassword } from '../database/auth';
import {Link, useNavigate} from "react-router-dom"
import * as Yup from 'yup'


export type LoginValueTypes = {
  username: string;
  password: string;
};


const validScheme = Yup.object({
  username: Yup.string().required("Required"),
  password: Yup.string().required('Required')
})



function Login() {

  //Initial Value of the form
  const initialValues: LoginValueTypes={
    username:"",
    password:""
  }

  //Use App Context
  const appContext = useAppContext()
  let navigate = useNavigate();



  const onSubmit = async (values:LoginValueTypes, actions:FormikHelpers<LoginValueTypes>)=>{

    
    const credentialCheck = await checkUsernamePassword(values);

    if(credentialCheck) {
      appContext.userLoggedin.setUser(values.username);
      navigate('../feed')
    }
    else{
      actions.resetForm();
    }
  }
  

  return (
    <div className="login-page">
      <div className="users-login">
        <div className='heading'>Sign up or use credential below to explore the App</div>
        <div>Username: karan</div>
        <div>password: test</div>
      </div>
      <div className='lp-headings'>
        <h1 className='lp-heading'>Login</h1>
        <h3 className="lp-sub-heading">Please sign in to continue</h3>
      </div>
      <Formik  initialValues={initialValues}validationSchema={validScheme} onSubmit={(values, actions)=> {onSubmit(values,actions)}}>
        <Form className='form'>
          <div className="login-form">
            <div className="login-form-items">
              <label htmlFor="username"><div className="login-icon" id='login-username-icon'></div></label>
              <Field autoComplete="off  " className="form-field" name='username' placeholder="Username"></Field>
              <ErrorMessage className='error' name='username' />
            </div>
            <div className="login-form-items">
              <div className="login-icon" id="login-password-icon"></div>
              <Field type='password' autoComplete="off" className="form-field" name="password" placeholder="Password"></Field>
              <ErrorMessage className='error' name='password'/>
            </div>
            <button type='submit' className='login-submit-btn'>LOGIN</button>
            <Link to="../signup" className='signup-link'>SIGN UP</Link>
          </div>
        </Form>
      </Formik>
    </div>
  )
}


 // const navigate = useNavigate();
  // const { setUser} = useAppContext()

  // const useLogin=(username:string)=>{
  //     setUser(username)
  //     navigate("/");
  // }

  

  // const useSubmit = async(values:LoginValueTypes)=>{
  //   let loginStatus = await checkUsernamePassword({username:values.username, password: values.password});
  //   if(loginStatus){
  //     useLogin(values.username); 
  //     console.log("loginin")
  //   }
  //   else{
  //     console.log("nogo")
  //   }
         
  // }

export default Login