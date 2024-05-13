import {defineArrayMember, defineField, defineType} from 'sanity'
import {MdOutlineOtherHouses} from 'react-icons/md'
import slug from '../fields/slug'
import modulesList from '../objects/modules/modulesList'

export default defineType({
  name: 'publisher',
  title: 'Publisher',
  type: 'document',
  icon: MdOutlineOtherHouses,
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

    // defineField({
    //   type: 'array',
    //   name: 'content',
    //   group: 'editorial',
    //   of: [
    //     defineArrayMember({
    //       type: 'block',
    //     }),
    //     defineArrayMember({
    //       type: 'figure',
    //     }),
    //   ],
    // }),
    defineField({
      name: 'modules',
      title: 'Modules',
      description: 'Zone de contenu Modulaire (image, texte, embed)',
      type: 'array',
      of: modulesList,
      group: 'editorial',
    }),
  ],
})
