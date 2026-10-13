import { useState } from 'react'
import './App.css'

function App() {

  const [submittedUsers, setSubmittedUsers] = useState([]);

  const [users, setUsers] = useState([
    { name: "", email: "", number: "" },
  ]);

  const [errors, setErrors] = useState([]);

  // Handle Input Change
  const handleChange = (index, e) => {
    const { name, value } = e.target;

    const list = [...users];
    list[index][name] = value;
    setUsers(list);
  };

  // Add New Field
  const addField = () => {
    setUsers([...users, { name: "", email: "", number: "" }]);
  };

  // Remove Field
  const removeField = (index) => {
    const list = [...users];
    list.splice(index, 1);
    setUsers(list);
  };

  // Validation
  const validate = () => {
    let tempErrors = [];

    users.forEach((user) => {
      let error = {};

      if (!user.name.trim()) {
        error.name = "Name is required";
      }

      if (!user.email.trim()) {
        error.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email)
      ) {
        error.email = "Invalid Email";
      }

      if (!user.number.trim()) {
        error.number = "Phone Number is required";
      } else if (!/^[6-9]\d{9}$/.test(user.number)) {
        error.number = "Enter valid 10-digit phone number";
      }

      tempErrors.push(error);
    });

    setErrors(tempErrors);

    return tempErrors.every(
      (err) => Object.keys(err).length === 0
    );
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setSubmittedUsers([...submittedUsers, ...users]);

      setUsers([
        { name: "", email: "", number: "" }
      ]);

      setErrors([]);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex justify-center items-center p-6">
        <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl p-8">

          <h1 className="text-4xl font-bold text-center text-indigo-700 mb-2">
            Dynamic User Form
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Add multiple users with validation
          </p>

          <form onSubmit={handleSubmit}>

            {users.map((user, index) => (
              <div
                key={index}
                className="border border-indigo-200 rounded-2xl p-5 mb-6 bg-indigo-50"
              >

                <div className="flex justify-between items-center mb-4">

                  <h2 className="font-semibold text-lg text-indigo-700">
                    User {index + 1}
                  </h2>

                  {users.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Remove
                    </button>
                  )}

                </div>

                <div className="grid md:grid-cols-3 gap-5">

                  {/* Name */}

                  <div>
                    <label className="font-medium">
                      Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Enter Name"
                      className="mt-2 w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                    />

                    {errors[index]?.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[index].name}
                      </p>
                    )}
                  </div>

                  {/* Email */}

                  <div>
                    <label className="font-medium">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Enter Email"
                      className="mt-2 w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                    />

                    {errors[index]?.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[index].email}
                      </p>
                    )}
                  </div>

                  {/* Age */}

                  <div>
                    <label className="font-medium">
                      Number
                    </label>

                    <input
                      type="text"
                      name="number"
                      value={user.number}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Enter Phone Number"
                      className="mt-2 w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                    />

                    {errors[index]?.number && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[index].number}
                      </p>
                    )}
                  </div>

                </div>

              </div>
            ))}

            {/* Buttons */}

            <div className="flex justify-between mt-8">

              <button
                type="button"
                onClick={addField}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg"
              >
                + Add User
              </button>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl shadow-lg"
              >
                Submit Form
              </button>

            </div>

          </form>
          {submittedUsers.length > 0 && (
            <div className="mt-10">

              <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
                Submitted Users
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                {submittedUsers.map((user, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-indigo-200 rounded-2xl shadow-lg p-5"
                  >
                    <h3 className="text-xl font-semibold text-indigo-700 mb-3">
                      User {index + 1}
                    </h3>

                    <p>
                      <span className="font-semibold">Name:</span> {user.name}
                    </p>

                    <p>
                      <span className="font-semibold">Email:</span> {user.email}
                    </p>

                    <p>
                      <span className="font-semibold">Phone:</span> {user.number}
                    </p>
                  </div>
                ))}

              </div>

            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App;
