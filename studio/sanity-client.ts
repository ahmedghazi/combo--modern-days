import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: '46r22z78',
  dataset: 'production',
  apiVersion: '2022-11-15',
})

export async function getProducts() {
  const products = await client.fetch('*[_type == "product"]')
  return products
}
