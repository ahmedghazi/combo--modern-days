const remoteURL = 'https://xxx.gtsb.io'
const localURL = 'http://localhost:8000'
const previewURL = window.location.hostname === 'localhost' ? localURL + '' : remoteURL + ''

// If you add document types to desk structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return !['media.tag', 'home', 'infos', 'settings', 'product', 'publisher', 'tag'].includes(id)
}

export const structure = (S) =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Réglages (header, footer, ...)')
        .schemaType('settings')
        .child(
          S.editor()
            .title('Réglages (header, footer, ...)')
            .schemaType('settings')
            .documentId('settings'),
        ),
      S.divider(),

      S.listItem()
        .title('Home')
        .schemaType('home')
        .child(S.editor().title('Home').schemaType('home').documentId('home')),

      S.listItem()
        .title('Infos')
        .schemaType('infos')
        .child(S.editor().title('Infos').schemaType('infos').documentId('infos')),

      S.divider(),

      /**
       * with seo preview
       */

      S.listItem()
        .title('Publisher')
        .schemaType('publisher')
        .child(S.documentTypeList('publisher')),
      S.divider(),

      S.listItem().title('Product').schemaType('product').child(S.documentTypeList('product')),
      S.listItem().title('Tags').schemaType('tag').child(S.documentTypeList('tag')),
      // S.divider(),

      // We also need to remove the new singletons from the main list
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
