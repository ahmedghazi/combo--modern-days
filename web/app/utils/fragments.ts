export const seo = `
	...,
	metaImage{
		asset->
	}
`;

export const blockContent = `
	...,
	_type == "figures" =>{
		items[]{
			...,
			image{
				asset->
			}
		}
	},
	markDefs[] {
		...,
		_type == "linkInternal" => {
			...,
			reference->,
		}
	}
`;

export const productCard = `
	_id,
  _type,
  slug,
  imageCover{
    ...,
    image{
			asset->
		}
  },
  title,
	price,
	publisher->{
    title
  }
`;

export const moduleText = `
	_type == 'textUI' => {
		...,
		text[]{
			${blockContent}
		}
	}
`;

export const moduleImage = `
	_type == 'imageUI' => {
		...,
		image {
			...,
			asset->
		}
	}
`;

export const moduleTextImage = `
	_type == 'textImageUI' => {
		text[]{
			${blockContent}
		},
		image {
			...,
			asset->
		}
	}
`;

export const moduleFeaturedProducts = `
	_type == 'moduleFeaturedProducts' => {
		...,
		items[]-> {
			${productCard}
		}
	}
`;

export const moduleProducts = `
	_type == 'moduleProducts' => {
		...,
		items[]-> {
			${productCard}
		}
	}
`;

export const moduleEmbed = `
	_type == 'moduleEmbed' => {
		...,
		embed{
			...,
			thumbnail {
				...,
				asset->
			}
		}
	}
`;

export const content = `
	...,
	items[]{
		...,
		image{
			asset->
		},

	}
`;
