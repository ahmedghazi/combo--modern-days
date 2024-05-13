import {defineArrayMember, defineField, defineType} from 'sanity'
import modulesList from '../objects/modules/modulesList'
import {InfoOutlineIcon} from '@sanity/icons'
import slug from '../fields/slug'

export default defineType({
  name: 'infos',
  title: 'Infos',
  type: 'document',
  icon: InfoOutlineIcon,
  validation: (Rule) =>
    Rule.custom((fields) => {
      return fields && fields.seo ? true : 'SEO needed'
    }),
  preview: {
    select: {
      title: 'seo.metaTitle',
      subtitle: 'seo.metaDescription',
      media: 'seo.metaImage',
    },
  },

  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'editorial',
    }),
    slug,

    defineField({
      name: 'modules',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'modulesGroup',
        }),
      ],
      group: 'editorial',
    }),

    defineField({
      name: 'titleAbout',
      title: 'label à propos',
      type: 'string',
      group: 'editorial',
      hidden: true,
    }),
    defineField({
      name: 'modulesAbout',
      title: 'Modules À propos',
      description: 'Zone de contenu Modulaire (image, texte, embed)',
      type: 'array',
      of: modulesList,
      group: 'editorial',
      hidden: true,
    }),
    defineField({
      name: 'titleContact',
      title: 'label contact',
      type: 'string',
      group: 'editorial',
      hidden: true,
    }),
    defineField({
      name: 'modulesContact',
      title: 'ModulesContact',
      description: 'Zone de contenu Modulaire (image, texte, embed)',
      type: 'array',
      of: modulesList,
      group: 'editorial',
      hidden: true,
    }),
  ],
})
