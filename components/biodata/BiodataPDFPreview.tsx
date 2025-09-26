 "use client";
 import { getCompleteBiodata } from "@/helper/biodataStorage.helper";
import { format } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import React from "react";
import { AiOutlineFilePdf } from "react-icons/ai";

interface BiodataPDFPreviewProps {
  biodata?: any;
}

 export default function BiodataPDFPreview({ biodata }: BiodataPDFPreviewProps) {
   const [data, setData] = React.useState<any>(null);
   const printRef = React.useRef<HTMLDivElement | null>(null);

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
        <div style={{ color: "#6b7280" }}>No biodata data available</div>
      </div>
    );
  }

   const handleDownloadPdf = async () => {
     const element = printRef.current;
     if (!element) return;

     // Force supported colors during capture by adding a temporary class to root & body
     const root = document.documentElement;
     const body = document.body;
     const prevElemBg = element.style.backgroundColor;
     try {
       root.classList.add("pdf-safe-colors");
       body.classList.add("pdf-safe-colors");
       element.style.backgroundColor = "#ffffff";

       // Ensure white background and consistent scale
       const canvas = await html2canvas(element, {
         scale: 2,
         backgroundColor: "#ffffff",
         useCORS: true
       });

       const imgData = canvas.toDataURL("image/png");

       // A4 size in mm
       const pdf = new jsPDF("p", "mm", "a4");
       const pageWidth = pdf.internal.pageSize.getWidth();
       const pageHeight = pdf.internal.pageSize.getHeight();

       const imgWidth = pageWidth; // full width
       const imgHeight = (canvas.height * imgWidth) / canvas.width;

       let heightLeft = imgHeight;
       let position = 0; // top position for first page

       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
       heightLeft -= pageHeight;

       while (heightLeft > 0) {
         position = heightLeft - imgHeight; // move up by page height
         pdf.addPage();
         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
         heightLeft -= pageHeight;
       }

       pdf.save(`${data?.stepOne?.fullName || "biodata"}.pdf`);
     } finally {
       // Restore previous styles
       element.style.backgroundColor = prevElemBg;
       root.classList.remove("pdf-safe-colors");
       body.classList.remove("pdf-safe-colors");
     }
   };

   return (
     <section className="pdf-safe-colors">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-end">
          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer"
            style={{ backgroundColor: "#45ccd2", color: "#ffffff" }}
          >
            <AiOutlineFilePdf size={18}/> Download PDF
          </button>
        </div>
      </div>
     <div ref={printRef} className="max-w-2xl mx-auto shadow-lg mt-5" style={{ backgroundColor: "#ffffff" }}>
      {/* Header */}
       <div className="py-4 px-6" style={{ backgroundColor: "rgba(69, 204, 210, 0.4)" }}>
        <div className="text-center">
           <h1 className="text-2xl uppercase font-semibold mb-2" style={{ color: "#000000" }}>Biodata</h1>
         
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Personal Information */}
         <div className=" p-4">
          
          <div className="flex gap-6">
            
            <div className="flex-1 space-y-2">
                <h2 className="text-4xl font-bold mb-3 " style={{ color: "#45ccd2" }}>
            {data.stepOne?.fullName || "Full Name"}
          </h2>
           <h3 className="text-lg font-semibold mb-4" style={{ color: "#000000" }}>Personal Information</h3>
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
                  <span className="font-medium">Languages</span> : English
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
                 <div className="w-full h-full rounded-lg border flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
                   <span className="text-xs" style={{ color: "rgba(0,0,0,0.4)" }}>No Photo</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className=" p-4">
           <h3 className="text-lg font-semibold mb-4" style={{ color: "#000000" }}>Medical History</h3>
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

         <div className=" p-4">
          <h3 className="text-lg font-semibold mb-4" style={{ color: "#000000" }}>Others</h3>
          <div className=" space-y-2 text-base">
            <div className="grid grid-cols-2 gap-4  ">
                <h4 className="font-medium">Preference for rest day</h4>{" "}
              : {data.stepTwo?.preferenceForRestDay || "N/A"}
            </div>
            <div className="grid grid-cols-2 gap-4  ">
              <h4 className="font-medium">Any other remarks</h4>{" "}
              : {data.stepThree?.anyOtherRemarks || "N/A"}
            </div>
          </div>
        </div>

        {/* Areas of Work Table */}
        {data.stepFour?.areasOfWork && data.stepFour.areasOfWork.length > 0 && (
          <div className=" p-4">
            <h3 className="text-lg font-semibold mb-4" style={{ color: "#000000" }}>Areas of Work</h3>
             <div className="overflow-x-auto">
               <table className="w-full border-collapse" style={{ border: "1px solid #4A4C56" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f5f7fa" }}>
                    <th style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm font-medium">S/No</th>
                    <th style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm font-medium">Areas of Work</th>
                    <th style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm font-medium">Willingness</th>
                    <th style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm font-medium">Experience</th>
                    <th style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm font-medium">Assessment</th>
                  </tr>
                </thead>
                <tbody>
                  {data.stepFour.areasOfWork.map((area: any, index: number) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm">{index + 1}</td>
                      <td style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm">{area.areaOfWork || ""}</td>
                      <td style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm">{area.willingness || ""}</td>
                      <td style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm">{area.experience || ""}</td>
                      <td style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm">{area.assessment || ""}</td>
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
            <h3 className="text-lg font-semibold mb-4" style={{ color: "#000000" }}>Employment History</h3>
             <div className="overflow-x-auto">
               <table className="w-full border-collapse" style={{ border: "1px solid #4A4C56" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f5f7fa" }}>
                     <th style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm font-medium">Date From</th>
                    <th style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm font-medium">Date To</th>
                    <th style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm font-medium">Country</th>
                    <th style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm font-medium">Employer</th>
                    <th style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm font-medium">Work Duties</th>
                    <th style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm font-medium">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm">
                      {data.stepFour.employmentHistory.dateFrom 
                        ? format(new Date(data.stepFour.employmentHistory.dateFrom), "yyyy") 
                        : ""}
                    </td>
                    <td style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm">
                      {data.stepFour.employmentHistory.dateTo 
                        ? format(new Date(data.stepFour.employmentHistory.dateTo), "yyyy") 
                        : ""}
                    </td>
                    <td style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm">
                      {data.stepFour.employmentHistory.country || ""}
                    </td>
                    <td style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm">
                      {data.stepFour.employmentHistory.employer || ""}
                    </td>
                    <td style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-3 py-2 text-sm">
                      {data.stepFour.employmentHistory.workDuties || ""}
                      </td>
             
                    <td style={{ border: "1px solid #4A4C56", textAlign: "center" }} className="px-2 py-1.5 text-sm">
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
           <h3 className="text-lg font-semibold mb-3" style={{ color: "#000000" }}>Other Remark</h3>
          <div className="text-sm">
            {data.stepFour?.employmentHistory?.otherRemarks || "N/A"}
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
