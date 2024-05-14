import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'
import slug from '../fields/slug'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: TagIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'editorial',
    }),
    slug,
    // defineField({
    //   name: 'tagType',
    //   title: 'Type',
    //   type: 'string',
    //   options: {
    //     list: [
    //       {title: 'Thème', value: 'theme'},
    //       {title: 'Géographie', value: 'geography'},
    //       {title: 'Métier', value: 'job'},
    //     ], // <-- predefined values
    //   },
    // }),
  ],
  preview: {
    select: {
      title: `title`,
      subtitle: 'tagType',
    },
  },
  orderings: [
    {
      title: 'Trier par theme ASC',
      name: 'themeAsc',
      by: [{field: 'tagType', direction: 'asc'}],
    },
    {
      title: 'Trier par theme DESC',
      name: 'themeDesc',
      by: [{field: 'tagType', direction: 'desc'}],
    },
  ],
})
