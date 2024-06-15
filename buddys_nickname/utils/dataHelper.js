const findItem = (data, item, key) => {
    return data.find((currentItem) => currentItem[key] === item)
}

module.exports = {findItem};