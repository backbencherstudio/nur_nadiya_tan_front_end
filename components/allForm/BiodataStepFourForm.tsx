"use client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getBiodataStep, getCompleteBiodata } from "@/helper/biodataStorage.helper";
import { useToken } from "@/hooks/useToken";
import { cn } from "@/lib/utils";
import { ImageContext } from "@/provider/ImageProvider";
import { UserService } from "@/service/user/user.service";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiChevronLeft } from "react-icons/fi";
import ButtonReuseable from "../reusable/CustomButton";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function BiodataStepFourForm() {
  const router = useRouter();
  const [dateFrom, setDateFrom] = React.useState<Date | undefined>();
  const [dateTo, setDateTo] = React.useState<Date | undefined>();
  const [allBiodata, setAllBiodata] = React.useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
 const {token} =useToken()
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    defaultValues: {
      // Areas of Work Section
      areaOfWork5: "Cooking",
      willingness5: false,
      experience5: false,
      assessment5: "",
      areaOfWork6: "Language abilities",
      willingness6: false,
      experience6: false,
      assessment6: "",
      areaOfWork7: "other skills",
      willingness7: false,
      experience7: false,
      assessment7: "",
      // Employment History Section
      dateFrom: "",
      dateTo: "",
      country: "",
      employer: "",
      workDuties: "",
      remarks: "",
      otherRemarks: ""
    }
  });
 const { image, setImage } = useContext(ImageContext);
 console.log("image",image);
  useEffect(() => {
    const completeData = getCompleteBiodata();
    setAllBiodata(completeData);
    const existingData = getBiodataStep('stepFour');
    if (existingData) {
      const formData = {
        areaOfWork5: existingData.areasOfWork?.areaOfWork5 || "Cooking",
        willingness5: existingData.areasOfWork?.willingness5 || false,
        experience5: existingData.areasOfWork?.experience5 || false,
        assessment5: existingData.areasOfWork?.assessment5 || "",
        areaOfWork6: existingData.areasOfWork?.areaOfWork6 || "Language abilities",
        willingness6: existingData.areasOfWork?.willingness6 || false,
        experience6: existingData.areasOfWork?.experience6 || false,
        assessment6: existingData.areasOfWork?.assessment6 || "",
        areaOfWork7: existingData.areasOfWork?.areaOfWork7 || "other skills",
        willingness7: existingData.areasOfWork?.willingness7 || false,
        experience7: existingData.areasOfWork?.experience7 || false,
        assessment7: existingData.areasOfWork?.assessment7 || "",
        dateFrom: existingData.date_from || "",
        dateTo: existingData.date_to || "",
        country: existingData.country || "",
        employer: existingData.employer || "",
        workDuties: existingData.work_duties || "",
        remarks: existingData.remarks || "",
        otherRemarks: existingData.other_remarks || ""
      };
      reset(formData);
      // Set dates
      if (existingData.date_from) {
        setDateFrom(new Date(existingData.date_from));
      }
      if (existingData.date_to) {
        setDateTo(new Date(existingData.date_to));
      }
    }
  }, [reset]);

  const onSubmit = async (data: any) => {
    const bool = (v: any) => Boolean(v);
    const payload: any = {
      any_other_remarks: allBiodata?.stepThree?.anyOtherRemarks ?? "",
      date_from: dateFrom ? dateFrom.toISOString() : "",
      date_to: dateTo ? dateTo.toISOString() : "",
      country: data.country ?? "",
      employer: data.employer ?? "",
      work_duties: data.workDuties ?? "",
      remarks: data.remarks ?? "",
      other_remarks: data.otherRemarks ?? "",
      age_of_childern: allBiodata?.stepOne?.age_of_childern ?? "",
      nationality: allBiodata?.stepOne?.nationality ?? "",
      religion: allBiodata?.stepOne?.religion ?? "",
      number_of_childern: allBiodata?.stepOne?.number_of_childern ?? "",
      place_of_birth: allBiodata?.stepOne?.place_of_birth ?? "",
      marital_status: allBiodata?.stepOne?.marital_status ?? "",
      name_of_airPort: allBiodata?.stepOne?.name_of_airPort ?? "",
      date_of_birth: allBiodata?.stepOne?.date_of_birth ? new Date(allBiodata?.stepOne?.date_of_birth as any).toISOString() : "",
      education_level: allBiodata?.stepOne?.education_level ?? "",
      height: allBiodata?.stepOne?.height ?? "",
      weight: allBiodata?.stepOne?.weight ?? "",
      full_name: allBiodata?.stepOne?.full_name ?? "",
      image: image || "",

      allergies: bool(allBiodata?.stepTwo?.allergies),
      asthma: bool(allBiodata?.stepTwo?.asthma),
      diabetes: bool(allBiodata?.stepTwo?.diabetes),
      dietary_restrictions: bool(allBiodata?.stepTwo?.dietary_restrictions),
      epilepsy: bool(allBiodata?.stepTwo?.epilepsy),
      heart_disease: bool(allBiodata?.stepTwo?.heart_disease),
      hypertension: bool(allBiodata?.stepTwo?.hypertension),
      malaria: bool(allBiodata?.stepTwo?.malaria),
      mental_illness: bool(allBiodata?.stepTwo?.mental_illness),
      operations: bool(allBiodata?.stepTwo?.operations),
      others: allBiodata?.stepTwo?.others ?? "",
      physical_disabilities: bool(allBiodata?.stepTwo?.physical_disabilities),
      preference_for_rest_days: bool(allBiodata?.stepTwo?.preference_for_rest_days),
      tuberculosis: bool(allBiodata?.stepTwo?.tuberculosis),

      area_of_work_one: allBiodata?.stepThree?.areasOfWork?.areaOfWork1 ?? "",
      area_of_work_two: allBiodata?.stepThree?.areasOfWork?.areaOfWork2 ?? "",
      area_of_work_three: allBiodata?.stepThree?.areasOfWork?.areaOfWork3 ?? "",
      area_of_work_four: allBiodata?.stepThree?.areasOfWork?.areaOfWork4 ?? "",
      area_of_work_five: data?.areaOfWork5 ?? "",
      area_of_work_six: data?.areaOfWork6 ?? "",
      area_of_work_seven: data?.areaOfWork7 ?? "",
      assessment_or_observation_one: allBiodata?.stepThree?.areasOfWork?.assessment1 ?? "",
      assessment_or_observation_two: allBiodata?.stepThree?.areasOfWork?.assessment2 ?? "",
      assessment_or_observation_three: allBiodata?.stepThree?.areasOfWork?.assessment3 ?? "",
      assessment_or_observation_four: allBiodata?.stepThree?.areasOfWork?.assessment4 ?? "",
      assessment_or_observation_five: data?.assessment5 ?? "",
      assessment_or_observation_six: data?.assessment6 ?? "",
      assessment_or_observation_seven: data?.assessment7 ?? "",

      willingness_one: bool((allBiodata?.stepThree?.areasOfWork as any)?.willingness1),
      willingness_two: bool((allBiodata?.stepThree?.areasOfWork as any)?.willingness2),
      willingness_three: bool((allBiodata?.stepThree?.areasOfWork as any)?.willingness3),
      willingness_four: bool((allBiodata?.stepThree?.areasOfWork as any)?.willingness4),
      willingness_five: bool(data?.willingness5),
      willingness_six: bool(data?.willingness6),
      willingness_seven: bool(data?.willingness7),
      experience_one: bool((allBiodata?.stepThree?.areasOfWork as any)?.experience1),
      experience_two: bool((allBiodata?.stepThree?.areasOfWork as any)?.experience2),
      experience_three: bool((allBiodata?.stepThree?.areasOfWork as any)?.experience3),
      experience_four: bool((allBiodata?.stepThree?.areasOfWork as any)?.experience4),
      experience_five: bool(data?.experience5),
      experience_six: bool(data?.experience6),
      experience_seven: bool(data?.experience7),
    };
    setIsSubmitting(true);
    try {
      const response = await UserService.addBiodata(payload, token)
      console.log("response",response);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
 console.log("allBiodata",allBiodata);
 
  const onBack = () => {
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
                          <SelectContent className="z-[9999] !relative">
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
                          <SelectContent className="z-[9999] !relative">
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
                type="submit"
                title={isSubmitting ? "Submitting..." : "Submit"}
                className="bg-primaryColor !px-5"
                loading={isSubmitting}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
