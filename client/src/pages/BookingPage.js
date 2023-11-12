import React, {useState,useEffect} from 'react'
import Layout from '../components/Layout'
import axios from "axios"
import { useParams } from 'react-router-dom'
import { DatePicker, message, TimePicker } from 'antd'
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import {showLoading,hideLoading} from "../redux/features/alertSlice"

const BookingPage = () => {
    const {user} = useSelector( state => state.user )
    const params = useParams();
    const [doctors, setDoctors] = useState([])
    const [date,setDate] = useState()
    const [time,setTime] = useState()
    const [isAvailable,setIsAvailable] = useState()
    const dispatch = useDispatch();
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        {
            doctorId: params.doctorId
        },
        
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if(res.data.success){
        setDoctors(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  //************booking function***************

  const handleBooking = async() =>{
    try{
        
        //setIsAvailable(true)
        if (!date || !time) {
          return alert("Date and Time Required");
        }
        
        dispatch(showLoading())
        const res= await axios.post('/api/v1/user/book-appointment',
        {
            doctorId: params.doctorId,
            userId:user._id,
            doctorInfo:doctors,
            date:date,
            userInfo : user,
            time:time,
        },
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        )
        dispatch(hideLoading())
        if(res.data.success){
            message.success(res.data.message)
        }

    }catch(error){
        dispatch(hideLoading())
        console.log(error)
    }

  }

  //************booking function***************

  //**************handle Availblity*********

  const handleAvailability = async() =>{
    if (!date || !time) {
      // If date or time is not selected, show an error message
      return alert("Date and Time Required");
    }
    try{
        dispatch(showLoading())
        const res = await axios.post('/api/v1/user/booking-availbility',
        {doctorId: params.doctorId,date,time},
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        )
        dispatch(hideLoading())
        if(res.data.success){
            //setIsAvailable(true)
            console.log(isAvailable)
            message.success(res.data.message)
        }else{
           //setIsAvailable(false);
            message.error(res.data.message)
        }

    }catch(error){
        dispatch(hideLoading());

        console.log(error);

    }
  }

  //**************handle Availblity*********

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
        <h3 className='text-center'>Booking Page</h3>
        <div className='container m-2'>
            {doctors && doctors.timings&&(
                <div>
                    <h3>Dr. {doctors.firstName} {doctors.lastName}</h3>
                    <h4>Fees : {doctors.feesPerCunsaltation}</h4>
                    <h4>Timings : {doctors.timings[0]} - {doctors.timings[1]}</h4>
                    <div className='d-flex flex-column w-50'>
                        <DatePicker aria-required={"true"} className='m-2' format="DD-MM-YYYY"  onChange={(value) =>{
                            
                             setDate( moment(value).format("DD-MM-YYYY"))} }/>

                        <TimePicker 
                            aria-required={"true"}
                            format="HH:mm"
                            className='m-2'
                            onChange={(value) =>{
                                
                                setTime(moment(value).format("HH:mm"))
                            }}
                        />
                        

                        <button className='btn btn-primary mt-2'
                            onClick={handleAvailability}>Check Availability</button>
                        
                            <button className='btn btn-success mt-2' 
                            onClick={handleBooking} >Book Now</button>
                        
                    </div>
                </div>

                
            )}
        </div>
    </Layout>
      
    
  )
}

export default BookingPage
