import cloudinary from "./config";

export const uploadFile = async (formData) => {
  try {
    formData.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME);
    formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

    let res = await fetch(
      `https://api.cloudinary.com/v1_1/dcualka2n/auto/upload`,
      {
        method: "post",
        mode: "cors",
        body: formData,
      }
    );

    let result = await res.json();

    return result.secure_url;
  } catch (error) {
    console.log("Error in uploadFile ===========> ", error);
    return error.message;
  }
};
