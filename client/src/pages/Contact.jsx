import React, { useState } from "react";
import { assets } from "../assets/data";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validation logic
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name must contain only alphabets";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    toast.success("Message sent successfully!");

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gradient-to-r from-[#fffbee] to-white py-16 pt-28">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center text-sm text-slate-800"
      >
        <p className="text-xs bg-black/80 text-white font-medium px-3 py-1 rounded-full">
          Contact Us
        </p>

        <h1 className="text-4xl font-bold py-4 text-center">
          Let’s Get In Touch.
        </h1>

        <p className="max-md:text-sm text-gray-500 pb-10 text-center">
          Or just reach out manually to us at{" "}
          <a href="#" className="text-secondary hover:underline">
            contact@nestorria.com
          </a>
        </p>

        <div className="max-w-96 w-full px-4">
          {/* Name */}
          <label className="font-medium">Full Name</label>
          <div className="flex items-center mt-2 h-10 pl-3 border border-slate-300 bg-secondary/10 rounded-full">
            <img src={assets.user} alt="" width={19} className="invert-50" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="h-full px-2 w-full outline-none bg-transparent"
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}

          {/* Email */}
          <label className="font-medium mt-4 block">Email Address</label>
          <div className="flex items-center mt-2 h-10 pl-3 border border-slate-300 bg-secondary/10 rounded-full">
            <img src={assets.mail} alt="" width={18} className="invert-50" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="h-full px-2 w-full outline-none bg-transparent"
              placeholder="Enter your email address"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}

          {/* Message */}
          <label className="font-medium mt-4 block">Message</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-slate-300 bg-secondary/10 rounded-lg resize-none outline-none"
            placeholder="Enter your message"
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}

          <button
            type="submit"
            className="flexCenter gap-1 mt-5 btn-secondary w-full !font-bold"
          >
            Submit Form
            <img src={assets.right} alt="" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
