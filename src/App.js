import "./styles.css";

import Headbar from "./components/Headbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function App() {
  const queryClient = new QueryClient();
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <Headbar />
      </QueryClientProvider>
    </main>
  );
}
