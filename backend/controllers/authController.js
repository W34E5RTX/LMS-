import { genToken } from "../configs/token.js"
import validator from "validator"

import bcrypt from "bcryptjs"
import User from "../models/userModel.js"

import sendMail from "../configs/Mail.js"

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
}

export const signUp = async (req, res) => {
 
    try {

        let { name, email, password, role } = req.body
        role = role || "student"

        if (!["student", "educator"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" })
        }

        let existUser = await User.findOne({ where: { email } })
        if (existUser) {
            return res.status(400).json({ message: "Email already exists" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter valid Email" })
        }
        if (!password || password.length < 8) {
            return res.status(400).json({ message: "Please enter a strong password" })
        }
        
        let hashPassword = await bcrypt.hash(password, 10)
        let user = await User.create({
            name,
            email,
            password: hashPassword,
            role,
        })

        let token = await genToken(user.id)
        res.cookie("token", token, cookieOptions)

        const userResponse = user.toJSON()
        delete userResponse.password
        return res.status(201).json(userResponse)

    } catch (error) {
        console.log("signUp error", error)
        return res.status(500).json({ message: `signUp Error ${error.message || error}` })
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body
        let user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }
        if (!user.password) {
            return res.status(400).json({ message: "Please login with Google" })
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" })
        }
        let token = await genToken(user.id)
        res.cookie("token", token, cookieOptions)

        const userResponse = user.toJSON()
        delete userResponse.password
        return res.status(200).json(userResponse)

    } catch (error) {
        console.log("login error", error)
        return res.status(500).json({ message: `login Error ${error.message || error}` })
    }
}




export const logOut = async(req,res)=>{
    try {
        res.clearCookie("token", cookieOptions)
        return res.status(200).json({message:"logOut Successfully"})
    } catch (error) {
        return res.status(500).json({message:`logout Error ${error}`})
    }
}


export const googleSignup = async (req, res) => {
    try {
        const { name, email, role } = req.body
        const normalizedRole = ["educator", "student"].includes(role) ? role : "student"

        let user = await User.findOne({ where: { email } })
        if (!user) {
            user = await User.create({
                name,
                email,
                role: normalizedRole,
            })
        }
        let token = await genToken(user.id)
        res.cookie("token", token, cookieOptions)

        const userResponse = user.toJSON()
        delete userResponse.password
        return res.status(200).json(userResponse)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `googleSignup  ${error.message || error}` })
    }
    
}

export const sendOtp = async (req,res) => {
    try {
        const {email} = req.body
        const user = await User.findOne({ where: { email } })
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        user.resetOtp=otp,
        user.otpExpires=new Date(Date.now() + 5*60*1000),
        user.isOtpVerified= false 

        await user.save()
        await sendMail(email,otp)
        return res.status(200).json({message:"Email Successfully send"})
    } catch (error) {

        return res.status(500).json({message:`send otp error ${error}`})
        
    }
}

export const verifyOtp = async (req,res) => {
    try {
        const {email,otp} = req.body
        const user = await User.findOne({ where: { email } })
        if(!user || user.resetOtp!=otp || user.otpExpires < new Date() ){
            return res.status(400).json({message:"Invalid OTP"})
        }
        user.isOtpVerified=true
        user.resetOtp=null
        user.otpExpires=null
        await user.save()
        return res.status(200).json({message:"OTP varified "})


    } catch (error) {
         return res.status(500).json({message:`Varify otp error ${error}`})
    }
}

export const resetPassword = async (req,res) => {
    try {
        const {email ,password } =  req.body
         const user = await User.findOne({ where: { email } })
        if(!user || !user.isOtpVerified ){
            return res.status(404).json({message:"OTP verfication required"})
        }

        const hashPassword = await bcrypt.hash(password,10)
        user.password = hashPassword
        user.isOtpVerified=false
        await user.save()
        return res.status(200).json({message:"Password Reset Successfully"})
    } catch (error) {
        return res.status(500).json({message:`Reset Password error ${error}`})
    }
}