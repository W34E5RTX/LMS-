import Review from "../models/reviewModel.js";
import Course from "../models/courseModel.js";

export const addReview = async (req, res) => {
  try {
    
    const { rating, comment ,courseId} = req.body;
    const userId = req.userId;
    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const alreadyReviewed = await Review.findOne({ where: { course: courseId, user: userId } });
    if (alreadyReviewed) return res.status(400).json({ message: "You have already reviewed this course" });

    const review = await Review.create({
      course: courseId,
      user: userId,
      rating,
      comment
    });

    course.reviews = [...(course.reviews || []), review.id];
    await course.save();

    return res.status(201).json(review);
  } catch (error) {
    console.error("Add Review Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;
    const reviews = await Review.findAll({ where: { course: courseId } });
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching reviews" });
  }
};


export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      order: [["reviewedAt", "DESC"]],
    });

    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
