import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({
                error: 'User does not exist'
            }, { status: 400 })
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({
                error: "Wrong email or password."
            }, {
                status: 400
            })
        }

        user.password = null
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login success",
            success: true,
            user
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
    }
}