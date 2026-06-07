import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { ToastContainer} from 'react-toastify';
import ForgotPassword from './pages/ForgotPassword'
import useCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Dashboard from './pages/admin/Dashboard'
import Courses from './pages/admin/Courses'
import AllCouses from './pages/AllCouses'
import AddCourses from './pages/admin/AddCourses'
import CreateCourse from './pages/admin/CreateCourse'
import CreateLecture from './pages/admin/CreateLecture'
import EditLecture from './pages/admin/EditLecture'

import useCourseData from './customHooks/getCouseData'
import ViewCourse from './pages/ViewCourse'
import ScrollToTop from './components/ScrollToTop'
import useCreatorCourseData from './customHooks/getCreatorCourseData'
import EnrolledCourse from './pages/EnrolledCourse'
import ViewLecture from './pages/ViewLecture'
import SearchWithAi from './pages/SearchWithAi'
import useAllReviews from './customHooks/getAllReviews'

// In development use local backend, otherwise use relative paths so Vercel routes /api/* correctly
export const serverUrl = import.meta.env.VITE_SERVER_URL ?? (import.meta.env.DEV ? "http://localhost:8000" : "")

function App() {
  
  let {userData} = useSelector(state=>state.user)

  useCurrentUser()
  useCourseData()
  useCreatorCourseData()
  useAllReviews()

  const renderUserRoute = (element) => {
    if (userData === undefined) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }
    return userData ? element : <Navigate to={'/signup'} />
  }

  const renderEducatorRoute = (element) => {
    if (userData === undefined) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }
    return userData?.role === 'educator' ? element : <Navigate to={'/signup'} />
  }
  return (
    <>
    
      <ToastContainer />
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
        <Route path='/profile' element={renderUserRoute(<Profile/>)} />
        <Route path='/allcourses' element={renderUserRoute(<AllCouses/>)} />
        <Route path='/viewcourse/:courseId' element={renderUserRoute(<ViewCourse/>)} />
        <Route path='/editprofile' element={renderUserRoute(<EditProfile/>)} />
        <Route path='/enrolledcourses' element={renderUserRoute(<EnrolledCourse/>)} />
         <Route path='/viewlecture/:courseId' element={renderUserRoute(<ViewLecture/>)} />
         <Route path='/searchwithai' element={renderUserRoute(<SearchWithAi/>)} />
        
        
        <Route path='/dashboard' element={renderEducatorRoute(<Dashboard/>)} />
        <Route path='/courses' element={renderEducatorRoute(<Courses/>)} />
        <Route path='/addcourses/:courseId' element={renderEducatorRoute(<AddCourses/>)} />
        <Route path='/createcourses' element={renderEducatorRoute(<CreateCourse/>)} />
        <Route path='/createlecture/:courseId' element={renderEducatorRoute(<CreateLecture/>)} />
        <Route path='/editlecture/:courseId/:lectureId' element={renderEducatorRoute(<EditLecture/>)} />
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
         </Routes>

         </>
   
  )
}

export default App
