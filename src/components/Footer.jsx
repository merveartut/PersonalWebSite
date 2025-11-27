import React from 'react';
import { useTheme } from '../context/ThemeContext';
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { motion } from 'framer-motion';

const Footer = () => {
    const { theme } = useTheme();

    // Footer temasına göre renkleri belirle
    const getFooterClass = () => {
        if (theme === 'dark') {
            return "bg-dark-background/95 text-gray-400 border-t border-dark-secondary";
        }
        if (theme === 'hacker') {
            return "bg-hacker-background/95 text-hacker-text border-t border-hacker-primary font-mono shadow-[0_0_10px_rgba(0,255,0,0.3)]";
        }
        return "bg-white/95 text-gray-600 border-t border-gray-200";
    };

    // İkon rengini temaya göre dinamik olarak ayarla
    const getIconClass = () => {
        if (theme === 'dark') {
            return "text-gray-400 hover:text-purple-400";
        }
        if (theme === 'hacker') {
            return "text-hacker-secondary hover:text-hacker-text";
        }
        return "text-gray-500 hover:text-purple-600";
    };

    return (
        <motion.footer
            className={`w-full py-6 transition-colors duration-500 backdrop-blur-sm ${getFooterClass()}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm">
                
                {/* Telif Hakkı ve Yapımcı Bilgisi */}
                <p className="order-2 md:order-1 mt-4 md:mt-0">
                    &copy; {new Date().getFullYear()} Merve Artut. | Made with React & Tailwind.
                </p>

                {/* Sosyal Medya Bağlantıları (Tekrar eden ikonlar yerine bu alanda gösterilebilir) */}
                <div className="flex space-x-6 order-1 md:order-2">
                    <motion.a
                        href="https://github.com/merveartut"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={getIconClass()}
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="GitHub Profilim"
                    >
                        <GitHubIcon fontSize="medium" />
                    </motion.a>
                    <motion.a
                        href="https://linkedin.com/in/merveartut"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={getIconClass()}
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="LinkedIn Profilim"
                    >
                        <LinkedInIcon fontSize="medium" />
                    </motion.a>
                    <motion.a
                        href="mailto:merveartuttt@gmail.com"
                        className={getIconClass()}
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="E-posta Gönder"
                    >
                        <EmailIcon fontSize="medium" />
                    </motion.a>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;