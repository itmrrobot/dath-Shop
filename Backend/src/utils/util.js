function mergeEntries(orders) {
  // Create an object to store merged order details for each user
  const mergedDetailsByUser = {};

  // Iterate over each order
  orders.forEach((order) => {
    const userName = order.name;

    // Initialize an object for the user if it doesn't exist
    if (!mergedDetailsByUser[userName]) {
      mergedDetailsByUser[userName] = {};
    }

    // Iterate over each order detail
    order.OrderDetails.forEach((orderDetail) => {
      const { id_product, size } = orderDetail;
      const key = `${id_product}_${size}`;

      // If the key already exists, increase the quantity
      if (mergedDetailsByUser[userName][key]) {
        mergedDetailsByUser[userName][key].quantity += parseInt(
          orderDetail.quantity
        );
      } else {
        // Otherwise, add a new entry
        mergedDetailsByUser[userName][key] = {
          ...orderDetail,
        };
      }
    });
  });

  // Convert the merged details object into the desired format
  const mergedDetailsArray = Object.entries(mergedDetailsByUser).map(
    ([name, details]) => {
      const array = orders.filter((o) => o.name === name);
      const object = array.reduce((acc, cur) => {
        delete cur.OrderDetails;
        cur.OrderDetails = Object.values(details);
        acc[cur.id] = cur;
        return acc;
      }, {});
      return object;
    }
  );
  const mergedArray = Object.values(Object.assign({}, ...mergedDetailsArray));
  return mergedArray;
}

function combineArray(arrays, firtProperty, sendcondProperty) {
  const combinedArrays = {};

  // Loop through each product
  arrays.forEach((item) => {
    // Check if the product ID already exists in combinedProducts
    if (combinedArrays[item[firtProperty]]) {
      // If exists, push the inventory to the existing product's Inventories array
      combinedArrays[item[firtProperty]][sendcondProperty].push(
        item[sendcondProperty]
      );
    } else {
      // If not exists, add the product to combinedProducts and initialize the Inventories array
      combinedArrays[item[firtProperty]] = {
        ...item,
        [sendcondProperty]: [item[sendcondProperty]],
      };
    }
  });
  const combinedArray = Object.values(combinedArrays);
  return combinedArray;
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

module.exports = { mergeEntries, generateRandomPassword, combineArray };
