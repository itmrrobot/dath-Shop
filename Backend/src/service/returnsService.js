const { Returns, Order, OrderDetail,Product,Inventory } = require("../models/index");
const cloudinary = require("../common/cloudinary-config");
const fs = require("fs");

const getReturnsList = async (id) => {
  let returnsList = [];
  returnsList = await Returns.findAll({
    where: { id_user: id },
    include: [
      {
        model: Order,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: OrderDetail,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      },
    ],
  });
  return returnsList;
};

const getAllReturns = async () => {
  const returns = await Returns.findAll({
    include: [
      {
        model: Order,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: OrderDetail,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: Product,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
                include: [
                  {
                    model: Inventory,
                    attributes: {
                      exclude: ["createdAt", "updatedAt"],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  return returns;
};

const getReturnsById = async (id) => {
  const returnsData = await Returns.findOne({
    where: { id },
    include: [
      {
        model: Order,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: OrderDetail,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      },
    ],
  });
  return returnsData;
};

const createReturns = async (data, files) => {
  const { orders, ...returnsData } = data;
  const ordersData = eval(orders);
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
  returnsData.img = JSON.stringify(uploadedImagesUrls);
  returnsData.video = JSON.stringify(uploadedVideosUrls);
  const newReturns = await Returns.create({ ...returnsData });
  if (ordersData) {
    ordersData.forEach(async (p) => {
      await Order.update(
        {
          id_returns: newReturns.id,
        },
        { where: { id: p.id } }
      );
    });
  }
  return newReturns;
};

const updateReturns = async(id,data) => {
  await Returns.update({...data},{where:{id}});
  return await Returns.findOne({where:{id}})
}

module.exports = {
  getReturnsList,
  createReturns,
  getReturnsById,
  getAllReturns,
  updateReturns
};
