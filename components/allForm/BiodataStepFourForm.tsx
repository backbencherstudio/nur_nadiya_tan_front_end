"use client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AreaOfWork, BiodataStepFour, getBiodataStep, getCompleteBiodata, saveBiodataStep } from "@/helper/biodataStorage.helper";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FiChevronLeft } from "react-icons/fi";
import BiodataPDFPreview from "../biodata/BiodataPDFPreview";
import ButtonReuseable from "../reusable/CustomButton";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function BiodataStepFourForm() {
  const router = useRouter();
  const [dateFrom, setDateFrom] = React.useState<Date | undefined>();
  const [dateTo, setDateTo] = React.useState<Date | undefined>();
  const [allBiodata, setAllBiodata] = React.useState<any>(null);

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    defaultValues: {
      // Areas of Work Section
      areaOfWork5: "Cooking",
      willingness5: "Yes",
      experience5: "No",
      assessment5: "",
      areaOfWork6: "Language abilities",
      willingness6: "",
      experience6: "No",
      assessment6: "",
      areaOfWork7: "other skills",
      willingness7: "",
      experience7: "No",
      assessment7: "",

      // Employment History Section
      dateFrom: "",
      dateTo: "No",
      country: "",
      employer: "",
      workDuties: "",
      remarks: "",
      otherRemarks: ""
    }
  });

  // Load all biodata on component mount
  React.useEffect(() => {
    const completeData = getCompleteBiodata();
    setAllBiodata(completeData);
    
    // Load existing step four data
    const existingData = getBiodataStep('stepFour');
    if (existingData) {
      reset(existingData);
      if (existingData.employmentHistory?.dateFrom) {
        setDateFrom(new Date(existingData.employmentHistory.dateFrom));
      }
      if (existingData.employmentHistory?.dateTo) {
        setDateTo(new Date(existingData.employmentHistory.dateTo));
      }
    }
  }, [reset]);

  const onSubmit = (data: any) => {
    console.log("Biodata Step Four Submitted:", data);
    
    // Get all areas of work from step 3 and step 4
    const allAreasOfWork: AreaOfWork[] = [];
    
    // Add areas from step 3 (items 1-4)
    const stepThreeData = getBiodataStep('stepThree');
    if (stepThreeData && stepThreeData.areasOfWork) {
      allAreasOfWork.push(...stepThreeData.areasOfWork);
    }
    
    // Add areas from step 4 (items 5-7)
    for (let i = 5; i <= 7; i++) {
      allAreasOfWork.push({
        areaOfWork: data[`areaOfWork${i}`] || "",
        willingness: data[`willingness${i}`] || "",
        experience: data[`experience${i}`] || "",
        assessment: data[`assessment${i}`] || ""
      });
    }

    const stepFourData: BiodataStepFour = {
      areasOfWork: allAreasOfWork, // All 7 areas of work combined
      employmentHistory: {
        dateFrom: dateFrom ? dateFrom.toISOString() : "",
        dateTo: dateTo ? dateTo.toISOString() : "",
        country: data.country || "",
        employer: data.employer || "",
        workDuties: data.workDuties || "",
        remarks: data.remarks || "",
        otherRemarks: data.otherRemarks || ""
      }
    };

    // Save to localStorage
    const saved = saveBiodataStep('stepFour', stepFourData);
    if (saved) {
      console.log("Data saved to localStorage successfully");
      // Show all collected data
      const completeData = getCompleteBiodata();
      setAllBiodata(completeData);
      console.log("Complete Biodata:", completeData);
    } else {
      console.error("Failed to save data to localStorage");
    }
  };

  const onBack = () => {
    console.log("Go back to previous step");
    router.push("/dashboard/biodata-management/biodata-step-three");
  };

  return (
    <div className="w-full border rounded-xl p-3 md:p-6 relative">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Biodata</h2>
        {/* <ButtonReuseable 
          title="Add New Biodata" 
          icon={<FiPlus className="w-4 h-4" />}
          className=""
        /> */}
      </div>

      {/* Areas of Work Form */}
      <div className="mb-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Areas of Work Section */}
          <div className="md:p-6 border p-3 pt-6 bg-whiteColor rounded-xl mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-6">Areas of Work</h3>

            {/* Areas of Work Sections 5, 6, 7 */}
            {[5, 6, 7].map((sectionNumber: any) => (
              <div key={sectionNumber} className="mb-6 p-4 border border-gray-200 rounded-lg">
                {/* Section Number */}
                <div className="mb-4">
                  <span className="text-xl font-bold text-gray-800">{sectionNumber}</span>
                </div>
                {/* Three Column Grid for inputs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Areas of Work */}
                  <div className="relative">
                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                      Areas of Work
                    </label>
                    <Input
                      placeholder="Enter area of work"
                      {...register(`areaOfWork${sectionNumber}` as any)}
                      className="w-full !h-12 lg:!h-13 !pl-4"
                    />
                  </div>

                  {/* Willingness */}
                  <div className="relative">
                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                      Willingness
                    </label>
                    <Controller
                      name={`willingness${sectionNumber}` as any}
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent className="z-[9999] !relative">
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {/* Experience */}
                  <div className="relative">
                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                      Experience
                    </label>
                    <Controller
                      name={`experience${sectionNumber}` as any}
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent className="z-[9999] !relative">
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                {/* Assessment/Observation - Full Width */}
                <div className="relative">
                  <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                    Assessment/Observation
                  </label>
                  <Textarea
                    placeholder="any..."
                    rows={3}
                    {...register(`assessment${sectionNumber}` as any)}
                    className="w-full !p-4"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Employment History Section */}
          <div className="md:p-6 border p-3 pt-6 bg-whiteColor rounded-xl">
            <h3 className="text-lg font-semibold text-gray-700 mb-6">Employment History</h3>

            {/* First Row - Three columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Date from */}
              <div className="relative">
                <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                  Date from
                </label>
                 <Popover>
                               <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full !h-12 lg:!h-13 !pl-4 justify-start text-left font-normal",
                                                    !dateFrom && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {dateFrom ? format(dateFrom, "MM/dd/yyyy") : "mm/dd/yyyy"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={dateFrom}
                                                onSelect={setDateFrom}
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>
              </div>

              {/* Date To */}
              <div className="relative">
                <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                  Date To
                </label>
               <Popover>
                               <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full !h-12 lg:!h-13 !pl-4 justify-start text-left font-normal",
                                                    !dateTo && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {dateTo ? format(dateTo, "MM/dd/yyyy") : "mm/dd/yyyy"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={dateTo}
                                                onSelect={setDateTo}
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>
              </div>

              {/* Country */}
              <div className="relative">
                <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                  Country
                </label>
                 <Input
                  placeholder="Enter country"
                  {...register("country")}
                  className="w-full !h-12 lg:!h-13 !pl-4"
                />
              </div>
            </div>

            {/* Second Row - Two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Employer */}
              <div className="relative">
                <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                  Employer
                </label>
                <Input
                  placeholder="Enter employer"
                  {...register("employer")}
                  className="w-full !h-12 lg:!h-13 !pl-4"
                />
              </div>

              {/* Work duties */}
              <div className="relative">
                <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                  Work duties
                </label>
                <Input
                  placeholder="Enter work duties"
                  {...register("workDuties")}
                  className="w-full !h-12 lg:!h-13 !pl-4"
                />
              </div>
            </div>

            {/* Third Row - Full width */}
            <div className="relative mb-4">
              <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                Remarks
              </label>
              <Textarea
                placeholder="any..."
                rows={3}
                {...register("remarks")}
                className="w-full !p-4"
              />
            </div>

            {/* Fourth Row - Full width */}
            <div className="relative">
              <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                Other remarks
              </label>
              <Textarea
                placeholder="any..."
                rows={3}
                {...register("otherRemarks")}
                className="w-full !p-4"
              />
            </div>
          </div>
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <ButtonReuseable
              type="button"
              title="Back"
              icon={<FiChevronLeft className="w-4 h-4" />}
              className="!bg-whiteColor !border border-primaryColor !text-primaryColor !px-5"
              onClick={onBack}
            />

            <div className="flex gap-3">
              <ButtonReuseable
                type="button"
                title="Preview PDF"
                className="!bg-green-600 !px-5"
                onClick={() => router.push("/dashboard/biodata-management/biodata-preview")}
              />
              <ButtonReuseable
                type="submit"
                title="Submit"
                className="bg-primaryColor !px-5"
              />
            </div>
          </div>
        </form>
      </div>

      {/* PDF Preview */}
      {allBiodata && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Biodata PDF Preview</h3>
          <BiodataPDFPreview biodata={allBiodata} />
        </div>
      )}
    </div>
  );
}
