
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import axios from 'axios'

const FormSubmissionComponent = ({ formData, setFormData, onBack, setStep }) => {
  const [range, setRange] = useState([
    {
      startDate: formData.start_date ? new Date(formData.start_date) : new Date(),
      endDate: formData.end_date ? new Date(formData.end_date) : addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

const handleSubmit = async () => {
  const { startDate, endDate } = range[0];

  if (!startDate || !endDate) {
    alert("Please select a valid date range.");
    return;
  }

  const updatedFormData = {
    ...formData,
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
  };

  try {
    const response = await axios.post("http://localhost:8000/api/booking", updatedFormData);
    alert("Booking successful!");

    setFormData({
      first_name: '',
      last_name: '',
      wheels: '',
      vehicleTypeId: '',
      vehicleId: '',
      start_date: '',
      end_date: '',
    });
    setStep(1);
    console.log(response.data);
  } catch (error) {
    console.error("Booking Error:", error);
    alert(error.response?.data?.message || "Booking failed");
  }
};


  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Choose your booking dates</h2>
      <div className="flex justify-center">
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={range}
        />
      </div>
      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-500 text-white">Back</button>
        <button onClick={handleSubmit} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white">Submit</button>
      </div>
    </div>
  );
};

export default FormSubmissionComponent;
