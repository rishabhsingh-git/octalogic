import React, { useState } from 'react';
import Card from '../shared/Card';


const SelectWheels = ({ formData, setFormData, onNext, onBack }) => {
  const [selected, setSelected] = useState(formData.wheels);

  const handleSubmit = () => {
    if (!selected) {
      alert('Please select number of wheels');
      return;
    }

    setFormData({ ...formData, wheels: selected });
    onNext();
  };

  return (
    <Card title="How many wheels do you need?">
      <div className="space-y-4">
        <div className="flex gap-4 justify-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="wheels"
              value="2"
              checked={selected === '2'}
              onChange={(e) => setSelected(e.target.value)}
              className="form-radio"
            />
            2 Wheeler
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="wheels"
              value="4"
              checked={selected === '4'}
              onChange={(e) => setSelected(e.target.value)}
              className="form-radio"
            />
            4 Wheeler
          </label>
        </div>

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

export default SelectWheels;
