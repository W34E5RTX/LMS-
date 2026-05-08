import { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
import { setCreatorCourseData } from '../redux/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const useCreatorCourseData = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector(state=>state.user)

    useEffect(()=>{
      const getCreatorData = async () => {
        try {
          const result = await axios.get(serverUrl + "/api/course/getcreatorcourses" , {withCredentials:true})
          await dispatch(setCreatorCourseData(result.data))
          console.log(result.data)
        } catch (error) {
          console.log(error)
          toast.error(error.response?.data?.message || "Failed to load creator courses")
        }
      }
      getCreatorData()
    },[dispatch,userData])
}

export default useCreatorCourseData
