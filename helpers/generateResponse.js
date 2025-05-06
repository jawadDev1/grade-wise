import { NextResponse } from "next/server";

export const generateResponse = async (callback) => {
  try {
    const result = await callback;
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log("Error ================> ", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
};
