"use client";

import { maidProfiles } from "@/demoData/maidProfiles";
import Image from "next/image";
import ButtonReuseable from "../reusable/CustomButton";

function JobList() {
 
  return (
    <section className="my-14 lg:my-[100px]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl  lg:text-[32px] xl:text-5xl leading-[120%] text-blackColor font-semibold mb-3">
           Sample transfer maids in Singapore
          </h2>
          <p className="text-base text-descriptionColor max-w-3xl mx-auto">
           Explore profiles of reliable transfer maids in Singapore, experienced in childcare, cooking, and household chores, ready for immediate employment
          </p>
        </div>

        {/* Maid Cards */}
        <div className="lg:space-y-10 space-y-5">
          {maidProfiles.map((maid) => (
            <div
              key={maid.id}
              className="flex  flex-col-reverse md:grid grid-cols-5 p-5 lg:p-6 bg-grayColor1/10 items-center rounded-2xl  overflow-hidden"
            >
              {/* Maid Info */}
              <div className=" md:col-span-3 mt-4">
                <h3 className="text-lg md:text-xl lg:text-[32px] text-headerColor font-semibold mb-3 md:mb-4 lg:mb-5">
                  {maid.name} ({maid.nationality}, {maid.age} years old)
                </h3>

                <div className="lg:space-y-4 space-y-2 text-sm lg:text-base text-descriptionColor">
                  <p>
                    <strong className="text-headerColor">Residence:</strong> {maid.yearsInSingapore} years in Singapore
                  </p>
                  <p>
                    <strong className="text-headerColor">Preferred care:</strong> {maid.preferredCare}
                  </p>
                  <p>
                    <strong className="text-headerColor">Skills:</strong> {maid.skills}
                  </p>
                  <p>
                    <strong className="text-headerColor">Languages:</strong> {maid.languages.english}, {maid.languages.native}
                    {maid.languages.additional && `, ${maid.languages.additional}`}
                  </p>
                  <p>
                    <strong className="text-headerColor">Available:</strong> {maid.availability}
                  </p>
                </div>
              </div>

              {/* Maid Image */}
              <div className="relative  h-full md:col-span-2">
                <Image
                  src={maid.image}
                  alt={`${maid.name} - ${maid.nationality} maid`}
               width={500}
               height={500}
                  className="object-cover h-full rounded-[12px]"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center flex justify-center mt-12">
          <ButtonReuseable
            title="View Available Biodata"
            className="!text-headerColor lg:!px-7 lg:!py-3.5 !font-medium"
          />
        </div>
      </div>
    </section>
  );
}

export default JobList;
