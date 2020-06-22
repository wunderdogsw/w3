let blocks = {}

blocks[
  "ContentfulArticleBlock"
] = require("../components/article-block").default

blocks["ContentfulHeroBlock"] = require("../components/hero-block").default

blocks["ContentfulImageBlock"] = require("../components/image-block").default

blocks["ContentfulLogosBlock"] = require("../components/logos-block").default

blocks["ContentfulOfficeBlock"] = require("../components/office-block").default

blocks[
  "ContentfulSectionBlock"
] = require("../components/section-block").default

blocks[
  "ContentfulStatisticsBlock"
] = require("../components/statistics-block").default

export default blocks
