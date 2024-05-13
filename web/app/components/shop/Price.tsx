import React from "react";

type Props = {
  price: number;
  priceCrossed?: number;
  qty?: number;
};

const Price = ({ price, priceCrossed, qty = 10 }: Props) => {
  return (
    <div className='price cartouche cartouche--accent inline-block- '>
      <div className='flex gap-02e'>
        {qty > 0 && qty < 2 && (
          <>
            <span className='low'>Low stock</span>
          </>
        )}
        {qty === 0 && <span className='low'>Sold out</span>}
        {qty !== 0 && (
          <>
            <span className={priceCrossed ? "price--crossed" : ""}>
              €{price}
            </span>
            {priceCrossed && <span className='ml-sm'>€{priceCrossed}</span>}
          </>
        )}
      </div>
    </div>
  );
};

export default Price;
