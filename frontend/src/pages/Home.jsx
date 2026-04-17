import React from 'react'
import home from "../assets/home1.jpg"
import Nav from '../components/Nav'
import { SiViaplay } from "react-icons/si";
import Logos from '../components/Logos';
import Cardspage from '../components/Cardspage';
import ExploreCourses from '../components/ExploreCourses';
import About from '../components/About';
import ai from '../assets/ai.png'
import ai1 from '../assets/SearchAi.png'
import ReviewPage from '../components/ReviewPage';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
function Home() {
      const navigate = useNavigate()

  return (

    
    
    <div className='w-[100%] overflow-hidden'>
      
      <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>
        <Nav/>
        <img src={home} className='object-cover md:object-fill   w-[100%] lg:h-[100%] h-[50vh]' alt="" />
        <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4'>
          <h1 className='text-white font-bold lg:text-[100px] md:text-[50px] text-[30px] leading-[1.05]'>Grow Your Skills to Advance</h1>
          <h2 className='text-white font-bold lg:text-[73px] md:text-[40px] text-[24px] leading-[1.05] mt-4'>Your Career Path</h2>
          <div className='mt-8 flex items-center justify-center gap-3 flex-wrap'>
            <button className='px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer' onClick={()=>navigate("/allcourses")}>View all Courses <SiViaplay className='w-[30px] h-[30px] lg:fill-white fill-black' /></button>
            <button className='px-[20px] py-[10px] lg:bg-white bg-black lg:text-black text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center' onClick={()=>navigate("/searchwithai")}>Search with AI <img src={ai} className='w-[30px] h-[30px] rounded-full hidden lg:block' alt="" /><img src={ai1} className='w-[35px] h-[35px] rounded-full lg:hidden' alt="" /></button>
          </div>
        </div>
      </div>
      <Logos/>
      <ExploreCourses/>
      <Cardspage/>
      <About/>
      <ReviewPage/>
      <Footer/>

      
      
      
    </div>

  ) 
}

export default Home
