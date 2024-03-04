"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProgressBar } from "next-nprogress-bar";
import { SessionProvider } from "next-auth/react";

const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 5, retryDelay: 1000 } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {children}
        <AppProgressBar
          height="4px"
          color="#fffd00"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default TanstackProvider;
