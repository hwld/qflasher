/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  exportPathMap: async function (defaultPathMap) {
    return {
      ...defaultPathMap,
      "/": { page: "/" },
      "/decks": { page: "/decks" },
      "/decks/create": { page: "/decks/create" },
      "/decks/edit": { page: "/decks/edit" },
      "/decks/play": { page: "/decks/play" },
    };
  },
};
