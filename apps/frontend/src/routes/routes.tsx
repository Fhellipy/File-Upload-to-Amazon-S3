import { Home } from "@routes/home";
import { Routes as AllRoutes, Route } from "react-router-dom";

export default function Routes() {
  return (
    <AllRoutes>
      <Route path="/" element={<Home />} />
    </AllRoutes>
  );
}
