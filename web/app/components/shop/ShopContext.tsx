"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
// import Script from "next/script";
// import UseLocaleContext from "../../context/LocaleContext";
import { publish } from "pubsub-js";

import { usePathname } from "next/navigation";

interface ShopContextProps {
  // location?: object;
  children: ReactNode;
  // pageContext: object;
}

type ContextProps = {
  ready: boolean;
  // userStatus: string;
  // customer: any;
  cartObject: any;
  // products: any;
  // cartItems: Array<any>;
};

const ShopContext = createContext<ContextProps>({} as ContextProps);

declare global {
  interface Window {
    Snipcart: any; // 👈️ turn off type checking
  }
}

export const ShopWrapper = ({ children }: ShopContextProps) => {
  const [ready, setReady] = useState(false);
  // const [userStatus, setUserStatus] = useState("");
  // const [customer, setCustomer] = useState();
  const [cartObject, setCartObject] = useState(null);
  const [variant, setVariant] = useState(null);
  // const [products] = useState([]);
  // const { locale } = UseLocaleContext();
  const pathname = usePathname();

  useEffect(() => {
    const Snipcart = window.Snipcart;
    // console.log(window);
    if (!Snipcart) {
      document.addEventListener("snipcart.ready", (e) => {
        console.log(e);
        setReady(true);
      });
    } else {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    setVariant(null);
  }, [pathname]);

  useEffect(() => {
    if (!ready) return;
    const { Snipcart } = window;

    Snipcart.api.session.setLanguage("fr", {
      // actions: {
      //   continue_shopping: "Go back to store",
      // },
      header: {
        // title_cart_summary: "Panier",
        // loading: "Chargement…",
      },
      cart: {
        // view_detailed_cart: "Voir le détail du panier",
      },
    });
    Snipcart.api.session.setCurrency("eur");

    const listenSnipcart = () => {
      const { cart } = Snipcart.store.getState();
      // console.log(Snipcart.store.getState().cart.items.items);
      // console.log(cart);
      // setCustomer(customer);
      // setUserStatus(customer.status);
      setCartObject(cart);

      Snipcart.events.on("item.adding", (item: any, items: any) => {
        // console.log("item.adding", item)
        // publish("item.adding", item);
        // publish("item.adding", item);
      });
      Snipcart.events.on("item.added", (cartItem: any) => {
        // console.log("item.added", cartItem)
        // publish("item.added", cartItem);
      });

      Snipcart.events.on("cart.confirm.error", (confirmError: any) => {
        console.log(confirmError);
      });
    };
    // listen store update
    const unsubscribe = Snipcart.store.subscribe(listenSnipcart);
    // call first
    listenSnipcart();
    return () => {
      unsubscribe();
    };
  }, [ready]);

  return (
    <ShopContext.Provider value={{ ready, cartObject }}>
      {children}
    </ShopContext.Provider>
  );
};
export default function useShop() {
  return useContext(ShopContext);
}
