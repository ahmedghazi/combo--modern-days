import {defineField} from 'sanity'
import {BsFileRichtext} from 'react-icons/bs'

export default defineField({
  name: 'textImageUI',
  title: 'Text image',
  type: 'object',
  icon: BsFileRichtext,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Module title (displayed only in the admin)',
    }),
    defineField({
      name: 'text',
      type: 'blockContent',
      title: 'Text',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      type: 'number',
      name: 'width',
      title: 'width',
      description: 'Size in a 12 column grid (1/12, 2/12, ..... 12/12). cf flexboxgrid.com',
      initialValue: 12,
      validation: (Rule) => Rule.required().min(1).max(12).warning('from 1 to 12'),
    }),
    defineField({
      type: 'number',
      name: 'offset',
      title: 'Offset',
      description: 'Indent in a 12 column grid (1/12, 2/12, ..... 12/12). cf flexboxgrid.com',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0).max(12).warning('from 1 to 12'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title,
        subtitle: 'Text image',
        media: image,
      }
    },
  },
})
