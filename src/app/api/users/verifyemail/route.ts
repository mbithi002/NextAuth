import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        const user = await User.findOne({ verifyToken: token })

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }
        if (user.verifyTokenExpiry < Date.now()) {
            return NextResponse.json({ error: "Token expired" }, { status: 401 })
        }
        console.log(user)

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save()

        user.password = undefined
        return NextResponse.json({
            message: "Email verified",
            success: true,
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}