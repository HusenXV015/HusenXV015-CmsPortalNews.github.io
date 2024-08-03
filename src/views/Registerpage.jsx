import Toastify from "toastify-js";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage({ url }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const newUser = { username, email, password, phoneNumber, address };
      await axios.post(`${url}/apis/add-user`, newUser); // Pastikan endpoint ini benar dan tidak memerlukan token

      Toastify({
        text: "Registration successful",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();

      navigate("/login");
    } catch (error) {
      Toastify({
        text: error.response.data.error || "An error occurred",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  function handleChange(setter) {
    return (event) => {
      setter(event.target.value);
    };
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md mx-auto bg-card shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-primary mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-primary">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring focus:ring-primary"
              onChange={handleChange(setUsername)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-primary">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring focus:ring-primary"
              onChange={handleChange(setEmail)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-primary">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring focus:ring-primary"
              onChange={handleChange(setPassword)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-primary">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phoneNumber number"
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring focus:ring-primary"
              onChange={handleChange(setPhoneNumber)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-primary">Address</label>
            <textarea
              id="address"
              name="address"
              placeholder="Enter your address"
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring focus:ring-primary"
              onChange={handleChange(setAddress)}
            ></textarea>
          </div>
          <button type="submit" className="bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/80 transition-colors">Register</button>
        </form>
      </div>
    </div>
  );
}
