let blocks = {}

blocks[
  "ContentfulContactBlock"
] = require("../components/contact-block").default

blocks["ContentfulHeaderBlock"] = require("../components/header-block").default

blocks[
  "ContentfulHubSpotFormBlock"
] = require("../components/hubspot-form-block").default

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
