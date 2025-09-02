'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
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
    { code: "id", name: "Indonesia", flag: "https://flagcdn.com/w20/id.png" },
    { code: "my", name: "Burmese", flag: "https://flagcdn.com/w20/mm.png" },
    { code: "zh-CN", name: "Mandarin", flag: "https://flagcdn.com/w20/cn.png" },
];

const LanguageSwitcher = ({ variant = 'default', className = '', onLanguageChange }: LanguageSwitcherProps) => {
    const [selectedLang, setSelectedLang] = useState("en");
    const { setSelectedLang: setContextLang } = useLanguage();

    // Load language from localStorage on component mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            setSelectedLang(savedLanguage);
        }
    }, []);

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
                <Select value={selectedLang} onValueChange={handleChange}>
                    <SelectTrigger className="w-full !px-2 !h-8 ">
                        <SelectValue className="" placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent className="!bg-blackColor">
                        {languages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code} className="hover:!bg-yellow-400 !px-2 !h-8 ">
                                <div className="flex items-center gap-2 !text-whiteColor">
                                    <Image src={lang.flag} alt={lang.name} width={20} height={20} className="rounded-xs" />
                                    {lang.name}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div id="google_translate_element" className="hidden" />
        </div>
    );
};

export default LanguageSwitcher;
