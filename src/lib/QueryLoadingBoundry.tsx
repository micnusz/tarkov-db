import { Card } from "@/components/ui/card";
import React, { ReactNode, Suspense } from "react";
import Spinner from "./Spinner";

type QueryLoadingBoundryProps = {
  children: ReactNode;
};

const QueryLoadingBoundry = ({ children }: QueryLoadingBoundryProps) => {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};

export default QueryLoadingBoundry;
