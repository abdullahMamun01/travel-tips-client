"use client";

import * as React from "react";


import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";


export interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient()

export function Providers({ children }: ProvidersProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
