const cloudinaryID = '1523222225';

const getCloudinaryImage = (imageName, scale = 1920) => `
  https://res.cloudinary.com/nicyoung/image/upload/c_scale,w_${scale}/v${cloudinaryID}/${imageName}.jpg
`;

export default getCloudinaryImage;
