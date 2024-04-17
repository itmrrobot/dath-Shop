function mergeEntries(entries) {
  let mergedEntries = [];
  let keyMap = new Map();
  entries.forEach((entry) => {
    let key = entry.size.toString() + entry.id_product.toString();
    if (keyMap.has(key)) {
      keyMap.get(key).quantity += entry.quantity;
    } else {
      keyMap.set(key, entry);
    }
  });
  mergedEntries = Array.from(keyMap.values());
  mergedEntries.sort((a, b) => a.id - b.id);
  return mergedEntries;
};

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

module.exports = {mergeEntries,generateRandomPassword}
