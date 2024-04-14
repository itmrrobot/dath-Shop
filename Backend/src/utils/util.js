module.exports = function mergeEntries(entries) {
    let mergedEntries = [];
    let keyMap = new Map();
    entries.forEach(entry => {
        let key = entry.size.toString() + entry.id_product.toString();
        if (keyMap.has(key)) {
            keyMap.get(key).quantity += entry.quantity;
        } else {
            keyMap.set(key, entry);
        }
    });
    mergedEntries = Array.from(keyMap.values());

    return mergedEntries;
}