const generateSlug = (name) => {
    return name
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")   // Remove special characters
        .replace(/\s+/g, "-")       // Spaces -> hyphens
        .replace(/-+/g, "-");       // Multiple hyphens -> one
};

const generateSKU = () => {
    const timestamp = Date.now();

    const random =
        Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();

    return `SKU-${timestamp}-${random}`;
};

const createPriceHistoryEntry = (price,adminId,reason)=>{
return{
        price,
        changedBy: adminId,
        reason,
    }
}

module.exports ={
    generateSlug,
    generateSKU,
    createPriceHistoryEntry,
}