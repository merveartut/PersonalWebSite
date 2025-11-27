import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import CodeIcon from '@mui/icons-material/Code';

const Preloader = () => {
    const { theme } = useTheme();

    // Tema rengini CSS değişkenlerinden çeken fonksiyon
    const getPrimaryColor = () => {
        if (typeof window !== 'undefined') {
            const root = document.documentElement;
            // --color-primary değişkenini index.css'ten çekiyoruz
            return getComputedStyle(root).getPropertyValue('--color-primary').trim();
        }
        return theme === 'hacker' ? '#00cc00' : theme === 'dark' ? '#9F7AEA' : '#6B46C1';
    };

    // Yükleyici animasyonu varyantları
    const loaderVariants = {
        animation: {
            rotate: [0, 360],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
            },
        },
    };

    const textVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.8 } }
    };

    const primaryColor = getPrimaryColor();

    return (
        // Sayfanın tamamını kaplayan kapsayıcı
        <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-colors duration-500`}
             style={{ backgroundColor: `var(--color-bg)` }}>
            
            {/* Dönen Yükleyici */}
            <motion.div
                className="relative w-20 h-20 border-4 rounded-full"
                variants={loaderVariants}
                initial="animation"
                animate="animation"
                style={{
                    borderColor: primaryColor, // Ana renk
                    borderTopColor: 'transparent', // Üst kısmı şeffaf yaparak dönme efekti yaratıyoruz
                    filter: theme === 'hacker' ? `drop-shadow(0 0 5px ${primaryColor})` : 'none',
                }}
            >
                {/* Ortadaki simge */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center text-xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{ color: primaryColor }}
                >
                    <CodeIcon fontSize="inherit" />
                </motion.div>
            </motion.div>

            {/* Yükleniyor Yazısı */}
            <motion.p 
                className={`mt-4 text-lg font-mono tracking-widest`}
                style={{ color: primaryColor }}
                variants={textVariants}
                initial="initial"
                animate="animate"
            >
                YÜKLENİYOR...
            </motion.p>
        </div>
    );
};

export default Preloader;