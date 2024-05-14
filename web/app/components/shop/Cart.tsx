"use client";
import { publish } from "pubsub-js";
import React, { useEffect, useRef, useState } from "react";
import useShop from "./ShopContext";
import clsx from "clsx";

const Cart = () => {
  const [count, setCount] = useState<number>(0);
  const cartRef = useRef<HTMLDivElement>(null);
  const { cartObject } = useShop();

  useEffect(() => {
    const { Snipcart } = window;
    if (!Snipcart) return;

    // const tokenEsc = subscribe("ESC", _onClose);

    // document.addEventListener("snipcart.ready", function () {
    //   console.log("snipcart ready");
    // });

    Snipcart.events.on("snipcart.initialization.error", () => {
      console.log("Failed to initialize Snipcart");
    });

    // Snipcart.events.on("item.added", (cartItem: any) => {
    //   if (!cartRef || !cartRef.current) return;

    //   // publish("ITEM.ADDED");
    //   setCount(Snipcart.store.getState().cart.items.count);
    // });
    // Snipcart.events.on("item.removed", (cartItem: any) => {
    //   setCount(Snipcart.store.getState().cart.items.count);
    // });

    return () => {
      // unsubscribe(tokenEsc);
    };
  }, []);

  useEffect(() => {
    if (cartObject) {
      // console.log(cartObject.items.count);
      setCount(cartObject.items.count);
    }
  }, [cartObject]);

  return (
    <div className='nav--cart' ref={cartRef}>
      <div className='flex gap-sm'>
        <div
          className={clsx(
            "snipcart-items--count",
            count === 0 ? "slideLeft" : ""
          )}>
          [{count}]
        </div>

        <button
          className='snipcart-checkout'
          aria-label='open cart'
          title='open cart'>
          PANIER
        </button>
      </div>
    </div>
  );
};

export default Cart;
