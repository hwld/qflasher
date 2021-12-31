/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  exportPathMap: async function (defaultPathMap) {
    return {
      ...defaultPathMap,
      "/": { page: "/decks" },
      "/decks": { page: "/decks" },
      "/decks/create": { page: "/decks/create" },
      "/decks/edit": { page: "/decks/edit" },
      "/decks/play": { page: "/decks/play" },
      "/404.html": { page: "/404" },
    };
  },
};
