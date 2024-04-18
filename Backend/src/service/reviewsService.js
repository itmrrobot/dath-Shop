const { Reviews,User } = require("../models/index");
const cloudinary = require("../common/cloudinary-config");
const fs = require("fs");

const getReviewsByProductId = async (id) => {
  const reviewsList = await Reviews.findAll({
    where: { id_product: id },
    include: [
      {
        model: User,
        attributes: {
          exclude: ["createdAt", "updatedAt", "id_order", "id_user"],
        },
      },
    ],
  });
  return reviewsList;
};

const createReviews = async (data, files) => {
  try {
    const folderImgName = "shop_imgs"; // Specify the folder name on Cloudinary
    const folderVideoName = "shop_video";
    const images = [];
    const videos = [];

    files.forEach((file) => {
      if (file.mimetype.startsWith("image")) {
        images.push(file);
      } else if (file.mimetype.startsWith("video")) {
        videos.push(file);
      }
    });
    const promisesImgs = images.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: folderImgName,
      });
      return result.secure_url;
    });
    const promisesVideos = videos.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: folderVideoName,
        resource_type: "video",
      });
      return result.secure_url;
    });
    const uploadedImagesUrls = await Promise.all(promisesImgs);
    const uploadedVideosUrls = await Promise.all(promisesVideos);
    files.forEach((file) => {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(`Error deleting file: ${file.path}`, err);
        } else {
          console.log(`File deleted: ${file.path}`);
        }
      });
    });
    data.img = JSON.stringify(uploadedImagesUrls);
    data.video = JSON.stringify(uploadedVideosUrls);
    const reviews = await Reviews.create(data);
    return reviews;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

module.exports = { getReviewsByProductId, createReviews };
