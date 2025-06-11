import React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useTranslation } from 'react-i18next';


const LanguageSwitchStyled = styled(Switch)(({ theme }) => ({
    width: 64,
    height: 34,
    padding: 9,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            transform: 'translateX(22px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#1e3591',
                opacity: 1,
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: '#fff',
        width: 32,
        height: 32,
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: '32px',
        textAlign: 'center',
        color: '#c12c25',
        position: 'relative',
        userSelect: 'none',
        '&:before': {
            content: `"TR"`,
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#c12c25',
        },
    },
    '& .Mui-checked .MuiSwitch-thumb:before': {
        content: `"EN"`,
        color: '#1e3591',
    },
    '& .MuiSwitch-track': {
        borderRadius: 20 / 2,
        backgroundColor: '#c12c25',
        opacity: 1,
    },
}));

export const LanguageToggleButton = () => {
    const { i18n } = useTranslation();

    const isEnglish = i18n.language === 'en';

    const handleChange = () => {
        i18n.changeLanguage(isEnglish ? 'tr' : 'en');
    };

    return (
        <LanguageSwitchStyled
            checked={isEnglish}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'language switch' }}
        />
    );
}
