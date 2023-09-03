import { NextjsSite } from "./NextjsSite";

export function AppPagesRouter({ stack }) {
  const site = new NextjsSite(stack, "apppagesrouter", {
    path: "../app-pages-router",
    buildCommand: "npm run openbuild",
    bind: [],
    environment: {
      USE_STREAMING_RESPONSE: "true",
    },
  });

  stack.addOutputs({
    url: site.url,
  });
}
