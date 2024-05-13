import home from './singletons/home'
// import pageModulaire from './documents/pageModulaire'
import tag from './documents/tag'
import infos from './singletons/infos'
import settings from './singletons/settings'
import product from './shop/product'
import publisher from './documents/publisher'

import blockContent from './objects/blockContent'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import seo from './objects/seo'
import figure from './objects/figure'
import keyVal from './objects/keyVal'

import variant from './shop/variant'

import imageUI from './objects/modules/imageUI'
import textUI from './objects/modules/textUI'
import textImageUI from './objects/modules/textImageUI'
import modulesGroup from './objects/modules/modulesGroup'

export const schemaTypes = [
  home,

  infos,
  settings,
  tag,
  product,
  publisher,

  blockContent,
  linkExternal,
  linkInternal,
  seo,
  figure,
  keyVal,
  variant,

  modulesGroup,
  imageUI,
  textUI,
  textImageUI,
]
export default schemaTypes
