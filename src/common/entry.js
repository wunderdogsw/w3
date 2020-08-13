const isAsset = entry => entry.nodeType === "embedded-asset-block"

const findContentType = entry => {
  return entry.data.target.fields.file["en-US"].contentType
}

module.exports = {
  isImage: entry => {
    if (!isAsset(entry)) return false

    return findContentType(entry).match(/^image\/.+$/i)
  },

  isVideo: entry => {
    if (!isAsset(entry)) return false

    return findContentType(entry).match(/^video\/.+$/i)
  },
}
