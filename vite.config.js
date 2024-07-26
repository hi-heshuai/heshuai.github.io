import path from "path";

export default {
  resolve: {
    alias: {
      "@h-form": path.resolve(__dirname, "./packages/"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
};
