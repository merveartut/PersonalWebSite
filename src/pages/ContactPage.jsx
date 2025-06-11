import { useState } from "react";
import TextArea from "../components/TextArea";
import TextInput from "../components/TextInput";
import emailjs from "emailjs-com";
import { useMediaQuery, useTheme } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useTranslation } from "react-i18next";
import letter from "../assets/letter.png"
import letterDark from "../assets/letter_dark.png"

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const isAnyFieldNull = !formData.name || !formData.email || !formData.message;
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const { t } = useTranslation();
  const theme = useTheme()


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
          () => {
            setSuccessMessage(
              "Yay! Your message just landed 🚀. I’ll get back to you soon—stay tuned!"
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
      className={`flex flex-col w-full h-full items-center justify-center px-4 ${isSmallScreen ? "py-10" : "ml-[160px] py-20"
        }`}
    >
      {theme.palette.mode === "light" ? (<img src={letter} className="absolute !mr-[800px]" width={400}></img>) : (<img src={letterDark} className="absolute !mr-[800px]" width={400}></img>)}
      {!successMessage && (
        <form className="w-full max-w-screen-md" onSubmit={handleSubmit}>

          <div className="p-6 rounded-lg flex gap-6 flex-col">

            <span className="text-4xl font-bold mb-4 font-rubik dark:text-white">
              {t("getintouch")}
            </span>

            <div className="flex flex-col gap-2">
              <div className="mb-4">
                <TextInput
                  name={"name"}
                  label={t("whoru")}
                  value={formData.name}
                  setValue={handleChange}
                />
              </div>

              <div className="mb-4">
                <TextInput
                  name="email"
                  value={formData.email}
                  setValue={handleChange}
                  label={t("emailInput")}
                />
              </div>

              <div className="mb-4">
                <TextArea
                  name="message"
                  placeholder={t("message")}
                  value={formData.message}
                  setValue={handleChange}
                  className="w-full max-w-full resize-none box-border"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isAnyFieldNull}
                  className={`bg-rose-900 dark:bg-blue-800 text-white px-4 py-2 rounded-md ${isAnyFieldNull
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-rose-700 dark:hover:bg-blue-700"
                    }`}
                >
                  {t("send")}
                </button>
              </div>
            </div>

          </div>
        </form>
      )}
      {successMessage && (
        <p className="text-green-500 font-roboto mt-6 w-[300px]">{successMessage}</p>
      )}
      <div className="flex gap-6 mt-10">
        <a href="https://github.com/merveartut" target="_blank" rel="noopener noreferrer">
          <GitHubIcon className="text-gray-600 hover:text-black transition-transform hover:scale-110" fontSize="large" />
        </a>
        <a href="https://linkedin.com/in/merveartut" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon className="text-gray-600 hover:text-blue-700 transition-transform hover:scale-110" fontSize="large" />
        </a>
        <a href="https://www.instagram.com/merveartut/">
          <InstagramIcon className="text-gray-600 hover:text-fuchsia-600 transition-transform hover:scale-110" fontSize="large" />
        </a>
        <a href="mailto:merveartuttt@gmail.com">
          <EmailIcon className="text-gray-600 hover:text-red-500 transition-transform hover:scale-110" fontSize="large" />
        </a>
      </div>
    </div>
  );
}

export default ContactPage;
