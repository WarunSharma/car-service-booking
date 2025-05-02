import React from "react";

function BookAppointment() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="space-y-4">
        <h1 className="text-2xl font-bold mb-4">
          Book Car Service Appointment
        </h1>
        <input
          type="text"
          placeholder="Vehicle Number"
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="date"
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Book Appointment
        </button>
      </form>
    </div>
  );
}

export default BookAppointment;
