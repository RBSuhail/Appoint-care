import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import React from 'react'
import {useSelector} from "react-redux";
import Spinner from "./components/Spinner";
import Protectedroutes from "./components/Protectedroutes";
import PublicRoutes from "./components/PublicRoutes";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
function App() {
  const {loading} = useSelector(state=>state.alerts)
  return (
    <>
      <BrowserRouter>
      {loading?<Spinner/>:
          <Routes>
          <Route path="/apply-doctor" 
           element={
            <Protectedroutes>
                <ApplyDoctor />
            </Protectedroutes>
            } />

          <Route path="/admin/users" 
           element={
            <Protectedroutes>
                <Users />
            </Protectedroutes>
            } />


          <Route path="/admin/doctors" 
           element={
            <Protectedroutes>
                <Doctors />
            </Protectedroutes>
            } />

          <Route path="/doctor/profile/:id" 
           element={
            <Protectedroutes>
                <Profile/>
            </Protectedroutes>
            } />

        <Route path="/doctor/book-appointment/:doctorId" 
           element={
            <Protectedroutes>
                <BookingPage/>
            </Protectedroutes>
            } />



            

        
  

          <Route path="/notification" 
           element={
            <Protectedroutes>
                <NotificationPage />
            </Protectedroutes>
            } />
            
          <Route path="/login"
           element={
            <PublicRoutes>
                <Login />
            </PublicRoutes>
           
           } />


          <Route path="/register" 
           element={
           <PublicRoutes>
              <Register />
           </PublicRoutes>
            
            } />


`          <Route path="/appointments"
           element={
            <Protectedroutes>
                <Appointments />
            </Protectedroutes>
           
           } />

`          <Route path="/doctor-appointments"
           element={
            <Protectedroutes>
                <DoctorAppointments />
            </Protectedroutes>
           
           } />

          <Route path="/" 
           element={
            <Protectedroutes>
                <HomePage />
            </Protectedroutes>
            } />


        </Routes>
      }
        
      </BrowserRouter>
    </>
  );
}

export default App;