import React from 'react'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import'./style/PostForm.css';
import addpost from '../database/addpost';
import { useAppContext } from '../../contexts/AppProvider';


type postInputType={
  post:string;
}

export default function () {

  const appContext = useAppContext();
  

  const initialValue:postInputType = { 
      post: '',
  }

  const onSubmit=(values:postInputType, actions:FormikHelpers<postInputType>)=>{
    

    addpost(values.post, appContext.userLoggedin.user);

    actions.resetForm();
    
  }


  return (
    <div className='post-form-page'>
        <Formik onSubmit={(values, actions)=>{onSubmit(values, actions)}} initialValues={initialValue}>
          <Form className="post-form">
            <button type='submit' className='post-form-btn'>Post</button>
            <Field className='post-field'  as='textarea' name="post" placeholder="What are your thoughts today...."/>
          </Form>
        </Formik>
    </div>
  )
}
