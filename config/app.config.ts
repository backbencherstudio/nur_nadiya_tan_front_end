// server base url
export const URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://127.0.0.1:4000";
// app config
export const AppConfig = () => ({
  app: {
    // server endpoint
    url: URL,
    name: "Transfer Maid Singapore",
    slogan: "Transfer Maid Singapore",
    meta: {
      description: "Transfer Maid Singapore",
      keywords: "Transfer Maid Singapore",
    },

    // api endpoint
    apiUrl: `${URL}/api`,
  },
});
