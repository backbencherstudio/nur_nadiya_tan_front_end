
import Image from "next/image";

function ContactPage() {
  return (
    <div className="">
      <div className=" relative">
        <Image
          src="/contact/contact.jpg"
          alt="contact image"
          width={2500}
          height={200}
          className=" w-full h-24 lg:h-auto"
        />
        <div className=" absolute top-1/2 left-1/2 -translate-1/2">
          <h2 className=" text-3xl lg:text-[72px] text-whiteColor font-medium">
            {" "}
            Contact us
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
