import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { checkUserExists } from '../database/explore'
import './Explore.css'

export default function Explore() {

    const [accountFound, setAccountFound] = useState<string>()
    
    const initialValues={
        query: ''
    }
    
    const onSubmit=()=>{
        console.log("submit")
    }

    const validate = async(values:{query:string})=>{
        const query = values.query;
        if(query){
            const userExists =  await checkUserExists(query)
            if(userExists){
                setAccountFound(query)
            }
            else{
                setAccountFound("")
            }
        }
        else{
            setAccountFound("")
        }
    }

    const QueryResult = ()=>{
        if(accountFound){
            return <Link className='query-result' to={'profile/'+accountFound}>@{accountFound}</Link>
        }else{
            return <div className="query-result">Not Found</div>
        }
    }

  return (
    <div className='explore-page'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validate={(values)=>validate(values)} >
            <Form className='explore-query-form'>
                <Field name="query" placeholder="Find your friends.." id="query" />
                <ErrorMessage className='error' name="query" />   
            </Form>
        </Formik>
        <div className="query-results">
            <div className="queries">
                <QueryResult/>
            </div>
            <div className="queried-profile">
                <Outlet />
            </div>
        </div>
    </div>
  )
}
