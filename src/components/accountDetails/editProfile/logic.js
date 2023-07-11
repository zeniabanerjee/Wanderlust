// import axios from "axios";

// const cloudinaryApi = process.env.REACT_APP_CLOUDINARY_API;
// const cloudinaryName = process.env.REACT_APP_CLOUDINARY_NAME;

// export const handleProfileImagetoUrl = async (image) => {
//   let imageUrl = "";

//   if (image) {
//     const formData = new FormData();
//     formData.append("file", image);
//     formData.append("upload_preset", "trouvaille");
//     formData.append("cloud_name", `${cloudinaryName}`);

//     await fetch(`${cloudinaryApi}/${cloudinaryName}/image/upload`, {
//       method: "post",
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         imageUrl = data.secure_url;
//       })
//       .catch((err) => {
//         return err;
//       });
//     return imageUrl;
//   } else return "";
// };
