import {CogIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Réglages (header, footer, ...)',
  type: 'document',
  icon: CogIcon,
  groups: [
    // {
    //   default: true,
    //   name: 'navigation',
    //   title: 'Navigation',
    // },
    {
      default: true,
      name: 'seo',
      title: 'Default SEO',
    },
    {
      name: 'header',
      title: 'Header',
    },
    {
      name: 'footer',
      title: 'Footer',
    },
    {
      name: 'misc',
      title: 'Misc',
    },
    {
      name: 'design',
      title: 'Design',
    },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      group: 'header',
    }),

    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        accept: 'image/svg+xml',
      },
      group: 'header',
    }),
    defineField({
      name: 'navPrimary',
      title: 'Naviguation Primary',
      type: 'array',
      of: [
        {
          type: 'linkInternal',
        },
        {
          type: 'linkExternal',
        },
      ],
      group: 'header',
    }),
    defineField({
      name: 'navPublishers',
      title: 'Naviguation Publishers',
      type: 'array',
      of: [
        {
          type: 'linkInternal',
        },
      ],
      group: 'header',
    }),
    // defineField({
    //   name: "navSecondary",
    //   title: "Naviguation Secondary",
    //   type: "array",
    //   of: [
    //     {
    //       type: "linkInternal",
    //     },
    //     {
    //       type: "linkExternal",
    //     },
    //   ],
    //   group: "footer",
    // }),

    // defineField({
    //   name: 'footerItems',
    //   title: 'Footer items',
    //   description: 'contact, links, credits',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'blockContent',
    //     },
    //   ],
    //   group: 'footer',
    // }),
    defineField({
      name: 'footerText',
      type: 'blockContent',
    }),

    defineField({
      name: 'message404',
      title: 'Message 404',
      type: 'blockContent',
      group: 'misc',
    }),

    defineField({
      name: 'customCss',
      type: 'text',
      group: 'design',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Réglages (header, footer, ...)',
      }
    },
  },
})
