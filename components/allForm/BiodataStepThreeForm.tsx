"use client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import ButtonReuseable from "../reusable/CustomButton";
import { useRouter } from "next/navigation";

export default function BiodataStepThreeForm() {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      anyOtherRemarks: "",
      areaOfWork1: "Care of infants/children Please...",
      willingness1: "Yes",
      experience1: "No",
      assessment1: "",
      areaOfWork2: "Care of elderly",
      willingness2: "Yes",
      experience2: "No",
      assessment2: "",
      areaOfWork3: "Care of disabled",
      willingness3: "No",
      experience3: "No",
      assessment3: "",
      areaOfWork4: "General housework",
      willingness4: "Yes",
      experience4: "No",
      assessment4: ""
    }
  });
const router = useRouter();
  const onSubmit = (data: any) => {
    console.log("Biodata Step Three Submitted:", data);
    router.push("/dashboard/biodata-management/biodata-step-four");
    // Handle next step logic here
  };

  const onBack = () => {
    console.log("Go back to previous step");
    // Handle back navigation here
  };

  return (
    <div className="w-full border rounded-xl p-3 md:p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Biodata</h2>
        <ButtonReuseable 
          title="Add New Biodata" 
          icon={<FiPlus className="w-4 h-4" />}
          className=""
        />
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
              {...register("anyOtherRemarks")}
              className="w-full !p-4"
            />
          </div>

          {/* Areas of Work Sections */}
          {[1, 2, 3, 4].map((sectionNumber:any) => (
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
                        <SelectContent>
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
                        <SelectContent>
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
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
                            <Link href="/dashboard/biodata-management/biodata-step-one">
                                <ButtonReuseable
                                    type="button"
                                    title="Back"
                                    icon={<FiChevronLeft className="w-4 h-4" />}
                                    className="!bg-whiteColor !border border-primaryColor !text-primaryColor !px-5"

                                />
                            </Link>

                                <ButtonReuseable
                                    type="submit"
                                   title="Next >"
                                    className="bg-primaryColor !px-5"
                                />

                        </div>
        </form>
      </div>
    </div>
  );
}
