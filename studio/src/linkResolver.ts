import {defineLocations, PresentationPluginOptions} from 'sanity/presentation'
import pageModulaire from '../schemaTypes/documents/pageModulaire'

export const linkResolver: PresentationPluginOptions['resolve'] = {
  locations: {
    // Add locations for documents of type 'post'
    home: defineLocations({
      // Select one or more fields
      select: {
        title: 'title.fr',
        slug: 'slug.current',
      },
      // Those fields are available in the resolve callback function
      resolve: (doc: {title?: string; slug?: string; homePage?: boolean}) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: '/',
          },
          // {title: 'Home', href: `/`},
        ],
      }),
    }),
    pageModulaire: defineLocations({
      // Select one or more fields
      select: {
        title: 'title.fr',
        slug: 'slug.current',
        homePage: 'homePage',
      },
      // Those fields are available in the resolve callback function
      resolve: (doc: {title?: string; slug?: string; homePage?: boolean}) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: doc?.homePage ? '/' : `/${doc?.slug}`,
          },
          // {title: 'Home', href: `/`},
        ],
      }),
    }),
    product: defineLocations({
      // Select one or more fields
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      // Those fields are available in the resolve callback function
      resolve: (doc: {title?: string; slug?: string}) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/product/${doc?.slug}`,
          },
          // {title: 'Home', href: `/`},
        ],
      }),
    }),
    infos: defineLocations({
      // Select one or more fields
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      // Those fields are available in the resolve callback function
      resolve: (doc: {title?: string; slug?: string}) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/${doc?.slug}`,
          },
          // {title: 'Home', href: `/`},
        ],
      }),
    }),
  },
}
