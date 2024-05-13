import {defineField} from 'sanity'
import {BiCarousel} from 'react-icons/bi'

export default defineField({
  name: 'moduleSliderUI',
  title: 'Slider',
  type: 'object',
  icon: BiCarousel,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'figure',
        },
      ],
    }),
    defineField({
      name: 'cta',
      type: 'linkExternal',
      title: 'Call to action button',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'items.0',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title,
        subtitle: 'Slider',
        media: media,
      }
    },
  },
})
