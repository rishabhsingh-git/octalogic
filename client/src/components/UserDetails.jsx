
import Card from "../shared/Card";


const UserDetailsComponent = ({ formData, setFormData, onNext }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      alert('Please fill in both first and last name');
      return;
    }
    onNext();
  };

  return (
    <Card title="What is your name?">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Enter your first name"
            className=" px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Enter your last name"
            className=" px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="ml-5mt-6">
          <button
            onClick={handleSubmit}
            className="px-2 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );
};

export default UserDetailsComponent;
