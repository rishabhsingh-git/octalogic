import { useEffect, useState } from 'react';
;
import axios from 'axios';
import Card from '../shared/Card';

const VehicleModel = ({ formData, setFormData, onNext, onBack }) => {
  const [vehicles, setVehicles] = useState([]);
  const [selected, setSelected] = useState(formData.vehicleId);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/vehicle/vehicles/${formData.vehicleTypeId}`);
        setVehicles(res.data?.data || []);
      } catch (err) {
        console.error('Error fetching vehicles:', err);
      }
    };

    if (formData.vehicleTypeId) fetchVehicles();
  }, [formData.vehicleTypeId]);

  const handleSubmit = () => {
    if (!selected) {
      alert('Please select a vehicle model');
      return;
    }
    setFormData({ ...formData, vehicleId: selected });
    onNext();
  };

  return (
    <Card title="Which vehicle model do you want?">
      <div className="space-y-4">
        {vehicles.length === 0 ? (
          <p className="text-center text-gray-500">No models available for this type.</p>
        ) : (
          vehicles.map((vehicle) => (
            <label key={vehicle.id} className="block cursor-pointer">
              <input
                type="radio"
                name="vehicle"
                value={vehicle.id}
                checked={selected == vehicle.id}
                onChange={(e) => setSelected(e.target.value)}
                className="mr-2"
              />
              {vehicle.model_name}
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

export default VehicleModel;
