import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/user.model.js";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody

        console.log(reqBody)

        const exsistingUser = await User.find({ email })

        if (exsistingUser.length > 0) {
            return NextResponse.json(
                { "error": "User with the same email already exists" },
                { status: 400 }
            )
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        console.log(savedUser)

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}