import { connect } from "@/dbconfig/dbconfig";
import { getTokenData } from "@/heplers/getTokenData";
import User from "@/models/user.model.js";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getTokenData(request)
        const user = await User.findById(userId).select("-password").lean()
        return NextResponse.json(user)
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
    }
}