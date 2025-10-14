import { createContext, useState } from "react";

export const ImageContext = createContext(null);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
    const [image, setImage] = useState<File | null>(null);
   
    
    return (
        <ImageContext.Provider value={{ image, setImage }}>
            {children}
        </ImageContext.Provider>
    );
};
