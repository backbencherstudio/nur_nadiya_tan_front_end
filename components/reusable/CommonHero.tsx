import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowForward } from "react-icons/io";
function CommonHero({pageName}) {
  return (
    <div>
      <div className=" relative">
        <Image
          src="/hero.jpg"
          alt="contact image"
          width={2500}
          height={200}
          className=" w-full h-24 lg:h-auto"
        />
        <div className=" absolute top-0 left-0 w-full h-full">
          <div className="container flex  items-center h-full">
            <div className="">
              <h2 className=" text-2xl lg:text-[48px] text-headerColor font-semibold">
                {" "}
                {pageName}
              </h2>
              <div className="flex items-center text-sm md:text-base font-medium gap-2 mt-1">
                <Link className="text-grayColor1" href="/">Home</Link> <IoIosArrowForward /> <p>{pageName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommonHero
