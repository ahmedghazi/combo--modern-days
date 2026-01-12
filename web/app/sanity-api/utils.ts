import React from "react";
import { Home, Infos, Product, Publisher } from "../types/schema";

export const _linkResolver = (
  node: Home | Infos | Product | Publisher | any
) => {
  // console.log(node);
  // console.log(node._type);
  if (!node || !node._type || node._type === "home") return "/";
  switch (node._type) {
    case "product":
      return `/product/${node.slug?.current}`;
    case "publisher":
      return `/publisher/${node.slug?.current}`;
    case "tag":
      return `/tag/${node.slug?.current}`;

    default:
      return `/${node.slug?.current}`;
  }
};

export const _preloadImages = (urls: Array<string | any>) => {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

export const _revealEmail = (input: string) => {
  return input.replace("(at)", "@");
};

export const _slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
};

export const _date = (d: string) => {
  const date: Date = new Date(d);

  return date.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
  });
};

// export const _throttle = (func, wait) => {
//   let waiting = false;
//   return function () {
//     if (waiting) {
//       return;
//     }

//     waiting = true;
//     setTimeout(() => {
//       func.apply(this, arguments);
//       waiting = false;
//     }, wait);
//   };
// };

export function getScrollingElement() {
  var d = document;
  return d.documentElement.scrollHeight > d.body.scrollHeight &&
    d.compatMode.indexOf("CSS1") == 0
    ? d.documentElement
    : d.body;
}
