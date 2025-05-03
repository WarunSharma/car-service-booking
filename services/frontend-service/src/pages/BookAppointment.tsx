import React, { useState } from "react";
import appointmentApi from "../services/appointmentApi";
import { Navigate, useNavigate } from "react-router-dom";

function BookAppointment() {

  const [form, setForm] = useState({date: '', vehicleNumber: ''});
  const navigate = useNavigate();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      await appointmentApi.post('/api/appointments', form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`          
        }
      })
      navigate('/');    
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold mb-4">
          Book Car Service Appointment
        </h1>
        <input
          type="text"
          placeholder="Vehicle Number"
          required
          value={form.vehicleNumber}
          onChange={(e) => setForm({...form, vehicleNumber: e.target.value})}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="date"
          required
          value={form.date}
          onChange={(e) => setForm({...form, date: e.target.value})}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Book Appointment
        </button>
      </form>
    </div>
  );
}

export default BookAppointment;
