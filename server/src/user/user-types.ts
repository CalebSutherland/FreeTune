export type TwitterProfile = {
  provider: "twitter";
  id: string;
  username: string;
  name: string;
  photos?: { value: string }[];
};
