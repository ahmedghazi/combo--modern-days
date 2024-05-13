// import React from "react";
// import { PageModulaire } from "../types/schema";
// import Figure from "./ui/Figure";
// import { _localizeField } from "../utils/utils";
// import { PortableText } from "next-sanity";

// type Props = {
//   input: PageModulaire;
// };

// const ContentPage = ({ input }: Props) => {
//   return (
//     <article className='content-page'>
//       <div className='hero'>
//         {input.imageHero && input.imageHero.asset && (
//           <Figure asset={input.imageHero?.asset} width={2000} />
//         )}
//       </div>
//       <div className='px-md-mobile md:px-lg'>
//         <div className='row col-md-10 col-xs-12 col-md-offset-1'>
//           <div className='header'>
//             <h1 className='text-xl'>{_localizeField(input.title)}</h1>
//           </div>
//           <div className='text'>
//             <PortableText value={_localizeField(input.text)} />
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default ContentPage;
