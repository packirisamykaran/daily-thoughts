import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppProvider';
import { profileDetails, updateProfile } from '../database/profile';
import './style/UpdateProfile.css'
import gif from '../media/loading.gif'
import { checkUsernameExists } from '../database/auth';


export type updateProfileType = {
  name: string;
  username: string;
  bio: string;
}




export default function UpdateProfile() {

  let navigate = useNavigate();

  const appContext = useAppContext()
  let user = appContext.userLoggedin.user;

  const [initialValues, setinitialValues] = useState<updateProfileType>();

  useEffect(() => {

    const getProfileDetails = async () => {
      const profile = await profileDetails(user);
      if (profile) {
        const iValues = {
          name: profile.name,
          username: profile.username,
          bio: profile.bio
        }
        setinitialValues(iValues);
      }

    }

    getProfileDetails();

  })

  const validate = async (values: updateProfileType) => {

    let error: any = {
    };




    // Username exist check
    if (values.username !== '' && values.username!==user) {
      const userExist = await checkUsernameExists(values.username);
      if (userExist) {

        error.username = "Username Taken"
      }
    }



    return error;

  }





  const onSubmit = async(values: updateProfileType) => {

    await updateProfile(values, user);

    
    let setUser= appContext.userLoggedin.setUser;

    //set current username in the app context
    setUser(values.username)

    //Navigate back to profile page
    navigate('/profile/'+values.username)


  }



  if (initialValues) {
    return (
      <div className='updatepage'>
        <Formik initialValues={initialValues} validate={(values) => validate(values)} onSubmit={(values) => { onSubmit(values) }}>
          <Form className='update-form'>
            <div className='username-container'>
              <div className="label">Username</div>
              <Field required="on" className='update-field' id="username" placeholder="Username" name='username' />
              <ErrorMessage className='error' name='username' />
            </div>
            <div className="label">Name</div>
            <Field className='update-field' placeholder="Name" name="name" />
            <div className="label">Bio</div>
            <Field className='update-field' placeholder='Bio' name="bio" />
            <button type='submit' id='submit-btn'>Update</button>
          </Form>
        </Formik>

      </div>
    )
  }
  else {
    return <img src={gif} alt="dsa" className="loading" />
  }
}
