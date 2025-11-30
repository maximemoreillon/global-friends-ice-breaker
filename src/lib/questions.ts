// Note: key behaves like an index or id so this could be a firebase collection

export default [
  {
    key: "favoriteFood",
    text: "What is your favorite food?",
  },
  {
    text: "What is your hobby?",
    key: "hobby",
  },
  {
    text: "Where are you from?",
    key: "country",
  },
] as const;
