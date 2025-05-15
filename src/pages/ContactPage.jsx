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
      className={`flex flex-col h-full w-[calc(100%-160px)] m-y-auto p-y-[20px] min-w-[400px] relative ${
        isSmallScreen ? "" : "ml-[160px]"
      } `}
    >
      <div className="flex flex-col h-screen w-full items-center justify-center p-5">
        {!successMessage && (
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <div className={styles.formCard}>
              <h3 className={styles.header}>Get in touch</h3>
              <div className={styles.formGroup}>
                <TextInput
                  name={"name"}
                  label={"Who are u ?"}
                  value={formData.name}
                  setValue={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <TextInput
                  name="email"
                  value={formData.email}
                  setValue={handleChange}
                  label={"Your email"}
                />
              </div>
              <div className={styles.formGroup}>
                <TextArea
                  name="message"
                  value={formData.message}
                  setValue={handleChange}
                />
              </div>
              <div className={styles.formGroupButton}>
                <button
                  disabled={isAnyFieldNull}
                  className={styles.sendButton}
                  onClick={handleSubmit}
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        )}
        {successMessage && (
          <p className="text-green-500 font-roboto">{successMessage}</p>
        )}
      </div>
    </div>
  );
}

export default ContactPage;
