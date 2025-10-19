"use client";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { TokenProvider } from "@/hooks/useToken";
import { ImageProvider } from "@/provider/ImageProvider";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { LanguageProvider } from "../home/LanguageProvider";
interface ClientLayoutProps {
  children: React.ReactNode;
}
const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const queryClient = new QueryClient(); 
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
     <TokenProvider>{children}</TokenProvider>
     </LanguageProvider>
     <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ClientLayout;
