export const routes = {
  rootPage: "/",
  myDecksPage: "/decks/my",
  publicDecksPage: "/decks/public",
  createDeckPage: "/decks/create",
  editDeckPage: "/decks/edit",
  playSettingPage: "/decks/play-setting",
  playDeckPage: "/decks/play",
  signInPage: "/signIn",
  notFoundPage: "/404",
} as const;

export type Routes = typeof routes[keyof typeof routes];

export const isRoute = (route: string): route is Routes => {
  return (Object.values(routes) as string[]).includes(route);
};
