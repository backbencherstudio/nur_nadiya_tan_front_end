"use client";

import { maidProfiles } from "@/demoData/maidProfiles";
import Image from "next/image";
import ButtonReuseable from "../reusable/CustomButton";
import SectionHeader from "../reusable/SectionHeader";

function JobList() {

  return (
    <section className="my-14 lg:my-[100px]">
      <div className="container">
        {/* Header */}
        <SectionHeader title="View profile of transfer maids in Singapore" description="Explore profiles of reliable transfer maids in Singapore, experienced in childcare, cooking, and household chores, ready for immediate employment" />
        {/* Maid Cards */}
        <div className="lg:space-y-10 space-y-5">
          {maidProfiles.map((maid) => (
            <div
              key={maid.id}
              className="flex group  flex-col-reverse md:grid grid-cols-5 p-5 lg:p-6 bg-[#EDFAFB] items-center rounded-2xl  overflow-hidden hover:shadow-xl transition-all shadow-primaryColor/40"
            >
              {/* Maid Info */}
              <div className=" md:col-span-3 mt-4">
                <h3 className="text-lg md:text-xl lg:text-[32px] text-primaryColor font-semibold mb-3 md:mb-4 lg:mb-5">
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
                    <strong className="text-headerColor">Languages:</strong>  {maid.languages.native} </p>
                  {maid?.softskills && <p>
                    <strong className="text-headerColor">Soft Skills:</strong> {maid?.softskills}
                  </p>}
                  {/* {maid?.Bahasa_Indonesia && <p>
                    <strong className="text-headerColor">Bahasa Indonesia:</strong> {maid?.Bahasa_Indonesia}
                  </p>} */}
                  {/* {maid?.Commitment && <p>
                    <strong className="text-headerColor">Commitment:</strong> {maid?.Commitment}
                  </p>} */}
                {/* {maid.availability && <p>
                    <strong className="text-headerColor">Available:</strong> {maid.availability}
                  </p>} */}
                </div>
              </div>

              {/* Maid Image */}
              <div className="relative overflow-hidden rounded-[12px]  h-full md:col-span-2">
                <Image
                  src={maid.image}
                  alt={`${maid.name} - ${maid.nationality} maid`}
                  width={500}
                  height={500}
                  className="object-cover h-full group-hover:scale-105 transition-all duration-300 rounded-[12px]"
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
