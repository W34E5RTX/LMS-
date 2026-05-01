import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { Op } from "sequelize";
import Course from "../models/courseModel.js";
dotenv.config();


export const searchWithAi = async (req,res) => {

    try {
         const { input } = req.body;
     
    if (!input) {
      return res.status(400).json({ message: "Search query is required" });
    }
 // case-insensitive
    const ai = new GoogleGenAI({});
const prompt=`You are an intelligent assistant for an LMS platform. A user will type any query about what they want to learn. Your task is to understand the intent and return one **most relevant keyword** from the following list of course categories and levels:

- App Development  
- AI/ML  
- AI Tools  
- Data Science  
- Data Analytics  
- Ethical Hacking  
- UI UX Designing  
- Web Development  
- Others  
- Beginner  
- Intermediate  
- Advanced  

Only reply with one single keyword from the list above that best matches the query. Do not explain anything. No extra text.

Query: ${input}
`

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:prompt,
  });
  const keyword=response.text



    const courses = await Course.findAll({
      where: {
        isPublished: true,
        [Op.or]: [
          { title: { [Op.iLike]: `%${input}%` } },
          { subTitle: { [Op.iLike]: `%${input}%` } },
          { description: { [Op.iLike]: `%${input}%` } },
          { category: { [Op.iLike]: `%${input}%` } },
          { level: { [Op.iLike]: `%${input}%` } },
        ],
      },
    });

    if(courses.length > 0) {
      return res.status(200).json(courses);
    } else {
      const courses = await Course.findAll({
        where: {
          isPublished: true,
          [Op.or]: [
            { title: { [Op.iLike]: `%${keyword}%` } },
            { subTitle: { [Op.iLike]: `%${keyword}%` } },
            { description: { [Op.iLike]: `%${keyword}%` } },
            { category: { [Op.iLike]: `%${keyword}%` } },
            { level: { [Op.iLike]: `%${keyword}%` } },
          ],
        },
      });
      return res.status(200).json(courses);
    }


    } catch (error) {
        console.log(error)
    }
}