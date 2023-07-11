const CLOUD_API = process.env.REACT_APP_CLOUD_API;
const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;

const imgToUrl = async (image) => {
  let imageUrl = "";
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "trouvaille");
  formData.append("cloud_name", `${CLOUD_NAME}`);

  await fetch(`${CLOUD_API}/${CLOUD_NAME}/image/upload`, {
    method: "post",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      imageUrl = data.secure_url;
    })
    .catch((err) => console.log(err));

  return imageUrl;
};

export default imgToUrl;
