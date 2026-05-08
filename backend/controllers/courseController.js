import uploadOnCloudinary from "../configs/cloudinary.js"
import Course from "../models/courseModel.js"
import Lecture from "../models/lectureModel.js"
import User from "../models/userModel.js"

// create Courses
export const createCourse = async (req,res) => {

    try {
        const {title,category} = req.body
        if(!title || !category){
            return res.status(400).json({message:"title and category is required"})
        }
        const course = await Course.create({
            title,
            category,
            creator: req.userId
        })
        
        return res.status(201).json(course)
    } catch (error) {
         return res.status(500).json({message:`Failed to create course ${error}`})
    }
    
}

export const getPublishedCourses = async (req,res) => {
    try {
        const courses = await Course.findAll({ where: { isPublished: true } })
        if(!courses)
        {
            return res.status(404).json({message:"Course not found"})
        }

        return res.status(200).json(courses)
        
    } catch (error) {
          return res.status(500).json({message:`Failed to get All  courses ${error}`})
    }
}


export const getCreatorCourses = async (req,res) => {
    try {
        const userId = req.userId
        const courses = await Course.findAll({ where: { creator: userId } })
        if(!courses)
        {
            return res.status(404).json({message:"Course not found"})
        }
        return res.status(200).json(courses)
        
    } catch (error) {
        return res.status(500).json({message:`Failed to get creator courses ${error}`})
    }
}

export const editCourse = async (req,res) => {
    try {
        const {courseId} = req.params;
        const {title , subTitle , description , category , level , price , isPublished } = req.body;
        let thumbnail
         if(req.file){
            thumbnail =await uploadOnCloudinary(req.file.path)
                }
        let course = await Course.findByPk(courseId)
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }
        course.title = title || course.title
        course.subTitle = subTitle || course.subTitle
        course.description = description || course.description
        course.category = category || course.category
        course.level = level || course.level
        course.price = price && price !== "" ? parseFloat(price) : course.price
        course.isPublished = isPublished === "true" ? true : isPublished === "false" ? false : course.isPublished
        if(thumbnail) course.thumbnail = thumbnail
        await course.save()
        return res.status(201).json(course)
    } catch (error) {
        return res.status(500).json({message:`Failed to update course ${error}`})
    }
}


export const getCourseById = async (req,res) => {
    try {
        const {courseId} = req.params
        let course = await Course.findByPk(courseId)
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }
         return res.status(200).json(course)
        
    } catch (error) {
        return res.status(500).json({message:`Failed to get course ${error}`})
    }
}
export const removeCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findByPk(courseId);
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.destroy();
    return res.status(200).json({ message: "Course Removed Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:`Failed to remove course ${error}`})
  }
};



//create lecture

export const createLecture = async (req,res) => {
    try {
        const {lectureTitle}= req.body
        const {courseId} = req.params

        if(!lectureTitle || !courseId){
             return res.status(400).json({message:"Lecture Title required"})
        }
        const course = await Course.findByPk(courseId)
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }

        const lecture = await Lecture.create({lectureTitle})
        course.lectures = [...(course.lectures || []), lecture.id]
        await course.save()
        return res.status(201).json({lecture,course})
        
    } catch (error) {
        return res.status(500).json({message:`Failed to Create Lecture ${error}`})
    }
    
}

export const getCourseLecture = async (req,res) => {
    try {
        const {courseId} = req.params
        const course = await Course.findByPk(courseId)
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }
        const lectureIds = Array.isArray(course.lectures) ? course.lectures : []
        const lectures = lectureIds.length > 0 ? await Lecture.findAll({ where: { id: lectureIds } }) : []
        return res.status(200).json({ course, lectures })
    } catch (error) {
        return res.status(500).json({message:`Failed to get Lectures ${error}`})
    }
}

export const editLecture = async (req,res) => {
    try {
        const {lectureId} = req.params
        const {isPreviewFree , lectureTitle} = req.body
        const lecture = await Lecture.findByPk(lectureId)
          if(!lecture){
            return res.status(404).json({message:"Lecture not found"})
        }
        let videoUrl
        if(req.file){
            videoUrl =await uploadOnCloudinary(req.file.path)
            lecture.videoUrl = videoUrl
                }
        if(lectureTitle){
            lecture.lectureTitle = lectureTitle
        }
        lecture.isPreviewFree = isPreviewFree === true || isPreviewFree === "true"
        
         await lecture.save()
        return res.status(200).json(lecture)
    } catch (error) {
        return res.status(500).json({message:`Failed to edit Lectures ${error}`})
    }
    
}

export const removeLecture = async (req,res) => {
    try {
        const {lectureId} = req.params
        const lecture = await Lecture.findByPk(lectureId)
        if(!lecture){
             return res.status(404).json({message:"Lecture not found"})
        }
        await lecture.destroy()
        const courses = await Course.findAll()
        await Promise.all(courses.map(async (course) => {
            if (!Array.isArray(course.lectures) || !course.lectures.some(id => String(id) === String(lecture.id))) return

            course.lectures = course.lectures.filter(id => String(id) !== String(lecture.id))
            await course.save()
        }))
        return res.status(200).json({message:"Lecture Remove Successfully"})
        }
    
     catch (error) {
        return res.status(500).json({message:`Failed to remove Lectures ${error}`})
    }
}



//get Creator data


// controllers/userController.js

export const getCreatorById = async (req, res) => {
  try {
    const {userId} = req.body;

    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json( user );
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "get Creator error" });
  }
};




