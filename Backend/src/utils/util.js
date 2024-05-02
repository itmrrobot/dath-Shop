function mergeEntries(orders) {
  const mergedOrders = {};

  orders.forEach((order) => {
    const id = order.id;

    if (!mergedOrders[id]) {
      mergedOrders[id] = { ...order };
      mergedOrders[id].OrderDetails = [mergedOrders[id].OrderDetails];
    } else {
      let found = false;
      mergedOrders[id].OrderDetails.forEach((detail) => {
        if (detail.size === order.OrderDetails.size) {
          detail.quantity += order.OrderDetails.quantity;
          found = true;
        }
      });
      if (!found) {
        mergedOrders[id].OrderDetails.push(order.OrderDetails);
      }
    }
  });

  return Object.values(mergedOrders);
}

function combineArray(arr) {
  const combinedObjects = {};
  
  arr.forEach(obj => {
      const id = obj.id;
      if (!combinedObjects[id]) {
          combinedObjects[id] = [obj];
      } else {
          combinedObjects[id].push(obj);
      }
  });
  
  return Object.values(combinedObjects);
}

function generateRandomPassword(length) {
  let charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|;:,.<>?";
  let password = "";

  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  // Ensure the password meets all criteria using regex
  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]|;:,.<>?]).{12}$/;
  while (!regex.test(password)) {
    password = generateRandomPassword(length);
  }

  return password;
}

function getPublicIdFromUrl(url) {
  // Extract the public ID from the Cloudinary URL
  const startIndex = url.lastIndexOf("/") + 1;
  const endIndex = url.lastIndexOf(".");
  return url.substring(startIndex, endIndex);
}

module.exports = { mergeEntries, generateRandomPassword, combineArray,getPublicIdFromUrl };
