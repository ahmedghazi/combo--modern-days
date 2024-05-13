import {defineField} from 'sanity'
import modulesList from './modulesList'
import {StackIcon} from '@sanity/icons'

export default defineField({
  name: 'modulesGroup',
  title: 'Modules Group',
  type: 'object',
  icon: StackIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: modulesList,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title,
        subtitle: 'Modules Group',
      }
    },
  },
})
