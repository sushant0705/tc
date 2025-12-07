export const uploadToCloudinary = async (pics, fileType) => {
  try {
    if (!pics) return;

    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "twitterimages");  // FIXED 🔥
    data.append("cloud_name", "dpqpkrux1");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dpqpkrux1/${fileType}/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const fileData = await res.json();
    console.log("Cloudinary response:", fileData);

    // Check error response
    if (fileData.error) {
      console.error("Upload failed:", fileData.error.message);
      return null;
    }

    return fileData.secure_url; // Correct key
  } catch (err) {
    console.error("Upload error:", err);
    return null;
  }
};
