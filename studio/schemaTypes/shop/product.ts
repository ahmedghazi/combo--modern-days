import {defineType, defineField, defineArrayMember} from 'sanity'
import sku from '../fields/sku'
import slug from '../fields/slug'

export default defineType({
  type: 'document',
  name: 'product',
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
    {
      name: 'shop',
      title: 'Shop',
    },
  ],

  fields: [
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
    }),

    defineField({
      type: 'string',
      name: 'title',
      group: 'editorial',
    }),
    slug,

    defineField({
      type: 'figure',
      name: 'imageCover',
      options: {hotspot: true},
      group: 'editorial',
    }),

    defineField({
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'figure',
        },
      ],
      description: 'slider',
      group: 'editorial',
    }),

    defineField({
      type: 'reference',
      name: 'publisher',
      to: [{type: 'publisher'}],
      group: 'editorial',
    }),

    sku,
    defineField({
      type: 'number',
      name: 'price',
      group: 'shop',
    }),
    defineField({
      type: 'number',
      name: 'priceCrossed',
      title: 'Prix barré (optionnel)',
      group: 'shop',
    }),
    defineField({
      type: 'number',
      name: 'weight',
      group: 'shop',
    }),

    defineField({
      type: 'reference',
      name: 'productCategory',
      to: [{type: 'tag'}],
    }),
    defineField({
      type: 'blockContent',
      name: 'description',
      group: 'editorial',
    }),
    defineField({
      type: 'text',
      name: 'information',
      group: 'editorial',
    }),
    defineField({
      type: 'blockContent',
      name: 'contributors',
      group: 'editorial',
    }),
  ],
})
