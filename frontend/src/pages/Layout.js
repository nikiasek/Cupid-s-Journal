import Outlet from "../components/Outlet"
import Header from "../components/Header"

const Layout = () => {
  return (
    <>
      <Header />
      <h1>Do you have an account?</h1>
      <Outlet />
    </>
  )
};

export default Layout;
