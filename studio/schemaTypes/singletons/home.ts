import {defineType, defineField} from 'sanity'
import {HomeIcon} from '@sanity/icons'
import modulesList from '../objects/modules/modulesList'
import slug from '../fields/slug'
// console.log(modulesList)

export default defineType({
  name: 'home',
  type: 'document',
  title: 'Home',
  icon: HomeIcon,
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
      type: 'string',
      title: 'Titre',
      group: 'editorial',
    }),
    slug,

    defineField({
      name: 'slider',
      title: 'Slider',
      description: '',
      type: 'array',
      of: [{type: 'figure'}],
      group: 'editorial',
    }),

    defineField({
      name: 'products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      group: 'editorial',
    }),
  ],
})
