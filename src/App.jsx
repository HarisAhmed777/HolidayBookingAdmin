import React from 'react';
import './App.css'
import Allusers from './components/Users'
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SidebarProvider } from './context/SidebarContext'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import AdminHomePage from './components/Pages/AdminHomePage';
import Login from './components/Login/Login';
import CalenderPage from './components/CalenderPage';
import Bookings from './components/Bookings';
import Allforms from './components/allforms';
import AdminOffers from './components/Offers';
import BlogPage from './components/Blogpage/Blogpage';
import AllBlogs from './components/Blogpage/AllBlogs';
import PackageAddPage from './components/Packages/AddPackage';
import Allpackages from './components/Packages/AllPackages';
import Logout from './components/Login/Logout';
import RiseTickets from './components/RiseTicket/RiseTicket';
import EditBlog from './components/Blogpage/EditBlog';
import EditPackage from './components/Packages/EditPackages';
function App() {

  return(
    <>
    <SidebarProvider>
      <BrowserRouter>
      <Routes>
                <Route path="/starholadmin/" element={<PublicRoute element={<Login />} />} />
                <Route path="/starholadmin/admin" element={<ProtectedRoute element={<AdminHomePage/>} />} />
                {/* <Route path="/starholadmin/datatables" element={<ProtectedRoute element={<Alldatatable />} />} /> */}
                <Route path="/starholadmin/allbookings" element={<ProtectedRoute element={<Bookings />} />} />
                <Route path="/starholadmin/allusers" element={<ProtectedRoute element={<Allusers />} />} />
                <Route path="/starholadmin/allforms" element={<ProtectedRoute element={<Allforms />} />} />
                <Route path="/starholadmin/CalenderPage" element={<ProtectedRoute element={<CalenderPage />} />} />
                <Route path="/starholadmin/offers" element={<ProtectedRoute element={<AdminOffers />} />} />
                <Route path="/starholadmin/blogpage" element={<ProtectedRoute element={<BlogPage />} />} />
                <Route path="/starholadmin/allblogs" element={<ProtectedRoute element={<AllBlogs />} />} />
                <Route path="/starholadmin/packageaddpage" element={<ProtectedRoute element={<PackageAddPage />} />} />
                <Route path="/starholadmin/allpackages" element={<ProtectedRoute element={<Allpackages />} />} />
                {/* <Route path="/starholadmin/totalearnings" element={<ProtectedRoute element={<Earnings/>} />} /> */}
                <Route path="/starholadmin/riseticket" element={<ProtectedRoute element={<RiseTickets />} />} />
              <Route path = "starholadmin/editblog/:id" element={<ProtectedRoute element={<EditBlog/>}/>}/>
              <Route path = "/starholadmin/editpackage" element={<ProtectedRoute element={<EditPackage/>}/>}/>

              /starholadmin/editpackage
                <Route path="/starholadmin/logout" element={<Logout/>} />
            </Routes>
      </BrowserRouter>
    </SidebarProvider>
    </>
  )
}

export default App
