import { getImage, getSrc } from "gatsby-plugin-image"

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

const getMetaImageSrc = entry => {
  // getImage and getSrc work safely when there is no image
  // https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#helper-functions
  const image = getImage(entry.metaImage) ?? getImage(entry.image)
  return getSrc(image)
}

export { capitalize, getMetaImageSrc }
