'use client';

import { useEffect, useState } from "react";
import { useLanguage } from './LanguageProvider';

declare global {
    interface Window {
        google: {
            translate: {
                TranslateElement: new (
                    config: {
                        pageLanguage: string;
                        includedLanguages: string;
                        autoDisplay: boolean;
                    }
                ) => void;
            };
        };
    }
}

interface LanguageSwitcherProps {
    variant?: 'default' | 'minimal';
    className?: string;
    onLanguageChange?: (lang: string) => void;
}

type Language = {
    code: string;
    name: string;
    flag: string;
};

const languages: Language[] = [
    { code: "en", name: "English", flag: "https://flagcdn.com/w20/gb.png" },
    { code: "id", name: "Bahasa Indonesia", flag: "https://flagcdn.com/w20/id.png" },
    { code: "my", name: "Burmese", flag: "https://flagcdn.com/w20/mm.png" },
    { code: "zh-CN", name: "Mandarin", flag: "https://flagcdn.com/w20/cn.png" },
];

const LanguageSwitcherLG = ({ variant = 'default', className = '', onLanguageChange }: LanguageSwitcherProps) => {
    const [selectedLang, setSelectedLang] = useState("en");
    const { setSelectedLang: setContextLang } = useLanguage();

    // Load language from localStorage on component mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            setSelectedLang(savedLanguage);
        }
    }, [selectedLang]);

    const handleChange = (value: string) => {
        setSelectedLang(value);
        localStorage.setItem('selectedLanguage', value);
        setContextLang(value);
        onLanguageChange?.(value);

        // Initialize Google Translate
        const waitForGoogleTranslate = setInterval(() => {
            if (typeof window.google !== 'undefined' && window.google.translate) {
                clearInterval(waitForGoogleTranslate);
                const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
                if (selectElement) {
                    selectElement.value = value;
                    selectElement.dispatchEvent(new Event('change'));
                }
                new window.google.translate.TranslateElement({
                    pageLanguage: 'en',
                    includedLanguages: 'en,id,my,zh-CN',
                    autoDisplay: false
                });
            }
        }, 100);

        setTimeout(() => clearInterval(waitForGoogleTranslate), 5000);
    };

    return (
        <div className={`flex items-center ${className}`}>
            <div className="!bg-blackColor">

                {languages.map((lang) => (
                    <button key={lang?.code} onClick={() => handleChange(lang?.code)} className=" px-2  border-r-2 last-of-type:border-r-0 border-r-borderColor   transition">
                        <div className={`${lang?.code === selectedLang ? "border-b-primaryColor" : "border-b-transparent hover:border-b-primaryColor"} text-base border-b-2 cursor-pointer text-whiteColor`}>{lang?.name}</div>
                    </button>
                ))}

            </div>
            <div id="google_translate_element" className="hidden" />
        </div>
    );
};

export default LanguageSwitcherLG;