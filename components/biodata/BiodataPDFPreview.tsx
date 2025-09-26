"use client";
import { getCompleteBiodata } from "@/helper/biodataStorage.helper";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

interface BiodataPDFPreviewProps {
  biodata?: any;
}

export default function BiodataPDFPreview({ biodata }: BiodataPDFPreviewProps) {
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    if (biodata) {
      setData(biodata);
    } else {
      const completeData = getCompleteBiodata();
      setData(completeData);
    }
  }, [biodata]);

  if (!data) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">No biodata data available</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg">
      {/* Header */}
      <div className="bg-primaryColor/40 py-4 px-6">
        <div className="text-center">
          <h1 className="text-headerColor text-2xl font-semibold mb-2">Company Name</h1>
         
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Personal Information */}
        <div className=" p-4">
          
          <div className="flex gap-6">
            
            <div className="flex-1 space-y-2">
               <h2 className="text-4xl font-bold text-primaryColor mb-3 ">
            {data.stepOne?.fullName || "Full Name"}
          </h2>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 gap-3 text-base">
                <div className="grid grid-cols-2 gap-2  ">
                  <span className="font-medium">Date of Birth:</span>{" "}
                  : {data.stepOne?.dob ? format(new Date(data.stepOne.dob), "dd MMMM yyyy") : "N/A"}
                </div>
                <div className="grid grid-cols-2 gap-2  ">
                  <span className="font-medium">Place of Birth</span>{" "}
                  : {data.stepOne?.placeOfBirth || "N/A"}
                </div>
                <div className="grid grid-cols-2 gap-2  ">
                  <span className="font-medium">Nationality</span>{" "}
                  : {data.stepOne?.nationality || "N/A"}
                </div>
                <div className="grid grid-cols-2 gap-2  ">
                  <span className="font-medium">Height</span>{" "}
                  : {data.stepOne?.height || "N/A"}
                </div>
                <div className="grid grid-cols-2 gap-2  ">
                  <span className="font-medium">Weight</span>{" "}
                  : {data.stepOne?.weight || "N/A"}
                </div>
                <div className="grid grid-cols-2 gap-2  ">
                  <span className="font-medium">Religion</span>{" "}
                  : {data.stepOne?.religion || "N/A"}
                </div>
                <div className="grid grid-cols-2 gap-2  ">
                  <span className="font-medium">Languages</span> English
                </div>
                <div className="grid grid-cols-2 gap-2  ">
                  <span className="font-medium">Marital Status</span>{" "}
                  : {data.stepOne?.maritalStatus || "N/A"}
                </div>
                <div className="grid grid-cols-2 gap-2  ">
                  <span className="font-medium">Education level</span>{" "}
                  : {data.stepOne?.educationLevel || "N/A"}
                </div>
                <div className="grid grid-cols-2 gap-2  ">
                  <span className="font-medium">Age of children</span>{" "}
                  : {data.stepOne?.ageOfChildren || "N/A"}
                </div>
                <div className="grid grid-cols-2 gap-2  ">
                  <span className="font-medium">Number of children</span>{" "}
                  : {data.stepOne?.numberOfChildren || "N/A"}
                </div>
              </div>
            </div>
            <div className="w-32 h-32 flex-shrink-0">
              {data.stepOne?.imagePreview ? (
                <Image
                  src={data.stepOne.imagePreview}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover rounded-lg border"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg border flex items-center justify-center">
                  <span className="text-gray-500 text-xs">No Photo</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className=" p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical History</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="grid grid-cols-2 gap-2  ">
              <h4 className="font-medium">Allergies (if any)</h4>{" "}
              : {data.stepTwo?.allergies || "N/A"}
            </div>
            <div className="grid grid-cols-2 gap-2  ">
              <h4 className="font-medium">Physical disabilities</h4>{" "}
              : {data.stepTwo?.physicalDisabilities || "N/A"}
            </div>
            <div className="grid grid-cols-2 gap-2  ">
              <h4 className="font-medium">Mental illness</h4>{" "}
              : {data.stepTwo?.mentalIllness || "N/A"}
            </div>
            <div className="grid grid-cols-2 gap-2  ">
              <h4 className="font-medium">Epilepsy</h4>{" "}
              : {data.stepTwo?.epilepsy || "N/A"}
            </div>
            <div className="grid grid-cols-2 gap-2  ">
              <h4 className="font-medium">Asthma</h4>{" "}
              : {data.stepTwo?.asthma || "N/A"}
            </div>
            <div className="grid grid-cols-2 gap-2  ">
              <h4 className="font-medium">Diabetes</h4>{" "}
              : {data.stepTwo?.diabetes || "N/A"}
            </div>
            <div className="grid grid-cols-2 gap-2  ">
              <h4 className="font-medium">Hypertension</h4>{" "}
              : {data.stepTwo?.hypertension || "N/A"}
            </div>
            <div className="grid grid-cols-2 gap-2  ">
              <h4 className="font-medium">Tuberculosis</h4>{" "}
              : {data.stepTwo?.tuberculosis || "N/A"}
            </div>
            <div className="grid grid-cols-2 gap-2  ">
              <h4 className="font-medium">Heart disease</h4>{" "}
              : {data.stepTwo?.heartDisease || "N/A"}
            </div>
            <div className="grid grid-cols-2 gap-2  ">
              <h4 className="font-medium">Malaria</h4>{" "}
              : {data.stepTwo?.malaria || "N/A"}
            </div>
            <div className="grid grid-cols-2 gap-2  ">
              <h4 className="font-medium">Operations</h4>{" "}
              : {data.stepTwo?.operations || "N/A"}
            </div>
            <div className="grid grid-cols-2 gap-2  ">
              <h4 className="font-medium">Dietary restrictions</h4>{" "}
              : {data.stepTwo?.dietaryRestrictions || "N/A"}
            </div>
          </div>
        </div>

        

        {/* Areas of Work Table */}
        {data.stepFour?.areasOfWork && data.stepFour.areasOfWork.length > 0 && (
          <div className=" p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Areas of Work</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">S/No</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Areas of Work</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Willingness</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Experience</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Assessment</th>
                  </tr>
                </thead>
                <tbody>
                  {data.stepFour.areasOfWork.map((area: any, index: number) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-3 py-2 text-sm">{index + 1}</td>
                      <td className="border border-gray-300 px-3 py-2 text-sm">{area.areaOfWork || ""}</td>
                      <td className="border border-gray-300 px-3 py-2 text-sm">{area.willingness || ""}</td>
                      <td className="border border-gray-300 px-3 py-2 text-sm">{area.experience || ""}</td>
                      <td className="border border-gray-300 px-3 py-2 text-sm">{area.assessment || ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Employment History Table */}
        {data.stepFour?.employmentHistory && (
          <div className=" p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Employment History</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Date From</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Date To</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Country</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Employer</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Work Duties</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      {data.stepFour.employmentHistory.dateFrom 
                        ? format(new Date(data.stepFour.employmentHistory.dateFrom), "yyyy") 
                        : ""}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      {data.stepFour.employmentHistory.dateTo 
                        ? format(new Date(data.stepFour.employmentHistory.dateTo), "yyyy") 
                        : ""}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      {data.stepFour.employmentHistory.country || ""}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      {data.stepFour.employmentHistory.employer || ""}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      {data.stepFour.employmentHistory.workDuties || ""}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      {data.stepFour.employmentHistory.remarks || ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other Remark */}
        <div className=" p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Other Remark</h3>
          <div className="text-sm">
            {data.stepFour?.employmentHistory?.otherRemarks || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
}
