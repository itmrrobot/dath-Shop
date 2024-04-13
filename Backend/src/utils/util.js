module.exports = function mergeEntries(entries) {
    let mergedEntries = [];
    let sizeMap = new Map();
    entries.forEach(entry => {
        let size = entry.size.toString();
        if (sizeMap.has(size)) {
            sizeMap.get(size).quantity += entry.quantity;
        } else {
            sizeMap.set(size, entry);
        }
    });
    mergedEntries = Array.from(sizeMap.values());
    return mergedEntries;
  }