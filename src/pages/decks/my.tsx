import { DeckListPage } from "@/components/pages/DeckListPage";
import { AuthRequiredPage } from "@/components/ui/AuthRequiredPage";
import { NextPage } from "next";

const MyDecks: NextPage = () => {
  const page = (userId: string) => <DeckListPage userId={userId} />;
  return <AuthRequiredPage>{page}</AuthRequiredPage>;
};

export default MyDecks;
