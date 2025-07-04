import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../shared/Card';

const VehicleType = ({ formData, setFormData, onNext, onBack }) => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selected, setSelected] = useState(formData.vehicleTypeId);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/vehicle/vehicle-types?wheels=${formData.wheels}`);
        setVehicleTypes(res.data?.data || []);
      } catch (err) {
        console.error('Error fetching vehicle types:', err);
      }
    };

    if (formData.wheels) fetchTypes();
  }, [formData.wheels]);

  const handleSubmit = () => {
    if (!selected) {
      alert('Please select a vehicle type');
      return;
    }
    setFormData({ ...formData, vehicleTypeId: selected });
    onNext();
  };

  return (
    <Card title="What type of vehicle do you prefer?">
      <div className="space-y-4">
        {!vehicleTypes.length ? (
          <p className="text-center text-gray-500">No vehicle types found.</p>
        ) : (
          vehicleTypes.map((type) => (
            <label key={type.id} className="block cursor-pointer">
              <input
                type="radio"
                name="vehicleType"
                value={type.id}
                checked={selected == type.id}
                onChange={(e) => setSelected(e.target.value)}
                className="mr-2"
              />
              {type.name}
            </label>
          ))
        )}

        <div className="flex justify-between mt-6">
          <button className="btn btn-secondary" onClick={onBack}>
            Back
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    </Card>
  );
};

export default VehicleType;
