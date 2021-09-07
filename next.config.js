/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  exportPathMap: async function () {
    return {
      "/": { page: "/decks" },
      "/decks": { page: "/decks" },
      "/decks/create": { page: "/decks/create" },
      "/decks/update": { page: "/decks/update" },
      "/decks/play": { page: "/decks/play" },
    };
  },
};
