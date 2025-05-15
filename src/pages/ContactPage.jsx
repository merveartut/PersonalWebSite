import React, { useState } from "react";
import styles from "./ContactPage.module.css";
import { TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import TextArea from "../components/TextArea";
import TextInput from "../components/TextInput";
import emailjs from "emailjs-com";
import { useMediaQuery } from "@mui/material";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const isAnyFieldNull = !formData.name || !formData.email || !formData.message;
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAnyFieldNull) {
      emailjs
        .send(
          "service_tj9sxsi",
          "template_sue3b8z",
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
          "-I_xrU8I1eCHqk6xl"
        )
        .then(
          (response) => {
            setSuccessMessage(
              "Yay! Your message just landed 🚀. We’ll get back to you soon—stay tuned!"
            );
            console.log("Message sent successfully!");
          },
          (error) => {
            console.error("Error:", error); // Log error details
            console.log("Failed to send message");
          }
        );
    }
  };
  return (
    <div
      className={`flex flex-col w-full h-full items-center justify-center px-4 ${
        isSmallScreen ? "py-10" : "ml-[160px] py-20"
      }`}
    >
      {!successMessage && (
        <form className="w-full max-w-screen-md" onSubmit={handleSubmit}>
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 font-roboto-mono">
              Get in touch
            </h3>

            <div className="mb-4">
              <TextInput
                name={"name"}
                label={"Who are u ?"}
                value={formData.name}
                setValue={handleChange}
              />
            </div>

            <div className="mb-4">
              <TextInput
                name="email"
                value={formData.email}
                setValue={handleChange}
                label={"Your email"}
              />
            </div>

            <div className="mb-4">
              <TextArea
                name="message"
                value={formData.message}
                setValue={handleChange}
                className="w-full max-w-full resize-none box-border"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isAnyFieldNull}
                className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                  isAnyFieldNull
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }`}
              >
                Send
              </button>
            </div>
          </div>
        </form>
      )}
      {successMessage && (
        <p className="text-green-500 font-roboto mt-6">{successMessage}</p>
      )}
    </div>
  );
}

export default ContactPage;
