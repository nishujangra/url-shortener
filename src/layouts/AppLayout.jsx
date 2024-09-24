import Header from "@/components/Header"
import { Outlet } from "react-router-dom"


const AppLayout = () => {
  return (
    <div>
      <div className="min-h-screen">
        <Header />
        <Outlet />
      </div>

      <footer className="text-white p-4 text-center">
        Made with 💗 by <span className="text-gray-400">@nishujangra27</span>
      </footer>
    </div>
  )
}

export default AppLayout;
