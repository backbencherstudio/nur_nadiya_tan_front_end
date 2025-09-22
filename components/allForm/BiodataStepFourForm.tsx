"use client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import ButtonReuseable from "../reusable/CustomButton";

export default function BiodataStepFourForm() {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      // Areas of Work Section
      areaOfWork5: "Cooking",
      willingness5: "Yes",
      experience5: "No",
      assessment5: "",
      areaOfWork6: "Language abilities",
      willingness6: "---",
      experience6: "No",
      assessment6: "",
      areaOfWork7: "other skills",
      willingness7: "---",
      experience7: "No",
      assessment7: "",
      
      // Employment History Section
      dateFrom: "General housework",
      dateTo: "No",
      country: "No",
      employer: "General housework",
      workDuties: "No",
      remarks: "",
      otherRemarks: ""
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
          className="bg-primaryColor"
        />
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
                          <SelectContent>
                            <SelectItem value="---">---</SelectItem>
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
                <Input 
                  placeholder="Enter date" 
                  {...register("dateFrom")}
                  className="w-full !h-12 lg:!h-13 !pl-4"
                />
              </div>

              {/* Date To */}
              <div className="relative">
                <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                  Date To
                </label>
                <Controller
                  name="dateTo"
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

              {/* Country */}
              <div className="relative">
                <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                  Country
                </label>
                <Controller
                  name="country"
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
            <Link href="/dashboard/biodata-management/biodata-step-three">
              <ButtonReuseable
                type="button"
                title="Back"
                icon={<FiChevronLeft className="w-4 h-4" />}
                className="!bg-whiteColor !border border-primaryColor !text-primaryColor !px-5"
              />
            </Link>

            <ButtonReuseable
              type="submit"
              title="Submit"
              icon={<FiChevronRight className="w-4 h-4" />}
              className="bg-primaryColor !px-5"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
