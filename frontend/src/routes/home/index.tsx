import { lazy } from "react";

const LazyHomeModule = lazy(() => import("@pages/home"));

export function Home() {
  return <LazyHomeModule />;
}
