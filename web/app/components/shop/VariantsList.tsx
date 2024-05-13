// import React, { useEffect, useRef, useState } from "react";
// import { ProductVariant } from "@/app/types/schema";
// import { _localizeField } from "@/app/utils/utils";
// import { publish } from "pubsub-js";
// import useShop from "./ShopContext";
// import clsx from "clsx";

// type Props = {
//   // input: ProductVariants;
//   items: ProductVariant[] | any;
//   title: string;
// };

// const VariantsList = ({ items, title }: Props) => {
//   const [value, setValue] = useState<ProductVariant | any>(null);
//   const { setVariant } = useShop();
//   useEffect(() => {
//     // publish("VARIANT_CHANGE", variant);
//     setVariant(value);
//   }, [value]);

//   const _onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     // dispatch(e.target.value);
//     const variant = items.filter((el: any) => el.title === e.target.value);
//     if (variant) setValue(variant[0]);
//   };
//   // console.log(items);
//   return (
//     <div className='variants-list'>
//       {items && items.length > 0 && (
//         <select
//           name='variants'
//           id=''
//           onChange={_onChange}
//           defaultValue={""}
//           className='cartouche uppercase'>
//           <option disabled={true} value=''>
//             Select your {title}
//           </option>
//           {items.map((item: ProductVariant, i: number) => (
//             <option value={item.title} key={i} disabled={item.qty === 0}>
//               {item.title}
//             </option>
//           ))}
//         </select>
//       )}
//     </div>
//   );
// };

// export default VariantsList;
