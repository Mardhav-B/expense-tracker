import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }: any) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:block hidden">
        <Sidebar />
      </div>
      <div className="flex-1 w-full">
        <Header />
        <div className="p-4 sm:p-6 w-full">{children}</div>
      </div>
    </div>
  );
}
