"use client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getBiodataStep, saveBiodataStep } from "@/helper/biodataStorage.helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiChevronLeft } from "react-icons/fi";
import ButtonReuseable from "../reusable/CustomButton";

export default function BiodataStepThreeForm({editedData}: {editedData?: any}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backLoading, setBackLoading] = useState(false);
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    defaultValues: {
      anyOtherRemarks: editedData?.any_other_remarks || "",
      areaOfWork1: "Care of infants/children Please...",
      willingness1: editedData?.care_of_infants_willingness || true,
      experience1: editedData?.care_of_infants_experience || false,
      assessment1: editedData?.care_of_infants_assessment || "",
      areaOfWork2: "Care of elderly",
      willingness2: editedData?.care_of_elderly_willingness || true,
      experience2: editedData?.care_of_elderly_experience || false,
      assessment2: editedData?.care_of_elderly_assessment || "",
      areaOfWork3: "Care of disabled",
      willingness3: editedData?.care_of_disabled_willingness || false,
      experience3: editedData?.care_of_disabled_experience || false,
      assessment3: editedData?.care_of_disabled_assessment || "",
      areaOfWork4: "General housework",
      willingness4: editedData?.general_housework_willingnes || true,
      experience4: editedData?.general_housework_experience || false,
      assessment4: editedData?.general_housework_assessment || ""
    }
  });

  // Load existing data on component mount
  useEffect(() => {
    const existingData = getBiodataStep('stepThree');
    if (existingData) {
        const formData = {
        areaOfWork1:  "Care of infants/children Please...",
        willingness1: existingData ? existingData.areasOfWork?.willingness1 || editedData?.care_of_infants_willingness : false,
        experience1: existingData ? existingData.areasOfWork?.experience1 || editedData?.care_of_infants_experience : false,
        assessment1: existingData ? existingData.areasOfWork?.assessment1 || editedData?.care_of_infants_assessment : "",
        areaOfWork2:  "Care of elderly",
        willingness2: existingData ? existingData.areasOfWork?.willingness2 || editedData?.care_of_elderly_willingness : false,
        experience2: existingData ? existingData.areasOfWork?.experience2 || editedData?.care_of_elderly_experience : false,
        assessment2: existingData ? existingData.areasOfWork?.assessment2 || editedData?.care_of_elderly_assessment : "",
        areaOfWork3:  "Care of disabled",
        willingness3: existingData ? existingData.areasOfWork?.willingness3 || editedData?.care_of_disabled_willingness : false,
        experience3: existingData ? existingData.areasOfWork?.experience3 || editedData?.care_of_disabled_experience : false,
        assessment3: existingData ? existingData.areasOfWork?.assessment3 || editedData?.care_of_disabled_assessment : "",
        areaOfWork4:  "General housework",
        willingness4: existingData ? existingData.areasOfWork?.willingness4 || editedData?.general_housework_willingnes : false,
        experience4: existingData ? existingData.areasOfWork?.experience4 || editedData?.general_housework_experience : false,
        assessment4: existingData ? existingData.areasOfWork?.assessment4 || editedData?.general_housework_assessment : "",
        anyOtherRemarks: existingData ? existingData.anyOtherRemarks || editedData?.any_other_remarks : ""
      };
      reset(formData);
    }
  }, [reset]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Transform data to match the expected format
      const areasOfWork: any = {};
      for (let i = 1; i <= 4; i++) {
        areasOfWork[`areaOfWork${i}`] = data[`areaOfWork${i}`] || "";
        areasOfWork[`willingness${i}`] = data[`willingness${i}`] || false;
        areasOfWork[`experience${i}`] = data[`experience${i}`] || false;
        areasOfWork[`assessment${i}`] = data[`assessment${i}`] || "";
      }
      const stepThreeData: any = {
        anyOtherRemarks: data.anyOtherRemarks,
        areasOfWork
      };
      const saved = saveBiodataStep('stepThree', stepThreeData);
      if (saved) {
        router.push(editedData ? `/dashboard/biodata-management/${editedData?.id}/biodata-edit-step-four` : "/dashboard/biodata-management/biodata-step-four");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } 
  };

  const onBack = () => {
    setBackLoading(true);
    router.push(editedData ? `/dashboard/biodata-management/${editedData?.id}/biodata-edit-step-three` : "/dashboard/biodata-management/biodata-step-three");
  };

  return (
    <div className="w-full border rounded-xl p-3 md:p-6">
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
          <div className="md:p-6 border p-3 pt-6  bg-whiteColor rounded-xl">
            {/* Any other remarks Section */}
            <div className="relative mb-4">
              <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                Any other remarks
              </label>
              <Textarea
                placeholder="other..."
                rows={3}
                {...register("anyOtherRemarks",{required: "Any other remarks is required"})}
                className="w-full !p-4"
              />
            </div>

            {/* Areas of Work Sections */}
            {[1, 2, 3, 4].map((sectionNumber: any) => (
              <div key={sectionNumber} className="mb-4">
                {/* Section Number */}
                <div className="mb-6">
                  <span className="text-xl font-bold text-gray-800">{sectionNumber}</span>
                </div>

                {/* Three Column Grid for inputs */}
                <div className="grid grid-cols-1 md:grid-cols-3 space-y-4 gap-4 mb-4">
                  {/* Areas of Work */}
                  <div className="relative">
                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                      Areas of Work
                    </label>
                    <Input
                      placeholder="Enter area of work"
                      {...register(`areaOfWork${sectionNumber}` as any)}
                      className="w-full !h-12 lg:!h-13 !pl-4"
                      readOnly
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
                        <Select onValueChange={(value) => field.onChange(value === "true")} value={field.value ? "true" : "false"}>
                          <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
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
                        <Select onValueChange={(value) => field.onChange(value === "true")} value={field.value ? "true" : "false"}>
                          <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
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
                    {...register(`assessment${sectionNumber}` as any ,{required: "Assessment/Observation is required"})}
                    className="w-full !p-4"
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <ButtonReuseable
              type="button"
              title="Back"
              sendingMsg="Backing..."
              icon={<FiChevronLeft className="w-4 h-4" />}
              className="!bg-whiteColor !border border-primaryColor !text-primaryColor !px-5"
              onClick={onBack}
              loading={backLoading}
            />

            <ButtonReuseable
              type="submit"
              title={"Next >"}
              sendingMsg="Submitting..."
              className="bg-primaryColor !px-5"
              loading={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
