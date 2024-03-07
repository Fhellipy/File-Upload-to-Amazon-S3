import Routes from "@routes/routes";
import "@styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes />
        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
