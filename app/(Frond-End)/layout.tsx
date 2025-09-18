import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/reusable/whatsAppButton";

import 'react-datepicker/dist/react-datepicker.css';
import 'swiper/css';
import 'swiper/css/navigation';
export default function FrontEndLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Navbar/>
            <WhatsAppButton/>
                    {children}
            <Footer/>
        </div>
    );
}
