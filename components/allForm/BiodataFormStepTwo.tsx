"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BiodataStepTwo, getBiodataStep, saveBiodataStep } from "@/helper/biodataStorage.helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiChevronLeft } from "react-icons/fi";
import ButtonReuseable from "../reusable/CustomButton";

export default function BiodataFormStepTwo() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<BiodataStepTwo>({
        defaultValues: {
            allergies: false,
            physical_disabilities: false,
            mental_illness: false,
            diabetes: false,
            heart_disease: false,
            epilepsy: false,
            asthma: false,
            hypertension: false,
            malaria: false,
            tuberculosis: false,
            operations: false,
            others: "",
            dietary_restrictions: false,
            preference_for_rest_days: false
        }
    });

    // Load existing data on component mount
    useEffect(() => {
        const existingData = getBiodataStep('stepTwo');
        if (existingData) {
            const formData = {
            allergies: existingData?.allergies || false,
            physical_disabilities: existingData?.physical_disabilities || false,
            mental_illness: existingData?.mental_illness || false,
            diabetes: existingData?.diabetes || false,
            heart_disease: existingData?.heart_disease || false,
            epilepsy: existingData?.epilepsy || false,
            asthma: existingData?.asthma || false,
            hypertension: existingData?.hypertension || false,
            malaria: existingData?.malaria || false,
            tuberculosis: existingData?.tuberculosis || false,
            operations: existingData?.operations || false,
            others: existingData?.others || "",
            dietary_restrictions: existingData?.dietary_restrictions || false,
            preference_for_rest_days: existingData?.preference_for_rest_days || false
      };

      console.log("formData",formData);
       
            // Add a small delay to ensure proper initialization
            setTimeout(() => {
                reset(formData);
            }, 100);
        }
    }, [reset]);

    const onSubmit = async (data: BiodataStepTwo) => {
        try {
            setIsSubmitting(true);
            const saved = saveBiodataStep('stepTwo', data);
            if (saved) {
                router.push("/dashboard/biodata-management/biodata-step-three");
            } else {
                console.error("Failed to save data to localStorage");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onBack = () => {
        console.log("Go back to previous step");
        router.push("/dashboard/biodata-management/biodata-step-one");
    };

    return (
        <section>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-headerColor">Biodata</h2>
                {/* <ButtonReuseable
                    title="Add New Biodata"
                    icon={<FiPlus className="w-4 h-4" />}
                    className=""
                /> */}
            </div>
            <div className="w-full border rounded-xl p-3 md:p-6">
                <div className="mb-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="md:p-6 p-3  rounded-xl bg-whiteColor border" key={JSON.stringify(getBiodataStep('stepTwo'))}>
                            <h3 className="text-lg font-semibold text-headerColor mb-6">Medical History</h3>
                            <div className="space-y-4  mb-4">
                                <h4 className="text-md font-medium text-gray-600 mb-4">General Medical History</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Allergies<span className="text-red-500">*</span>
                                        </label>
                                        <Controller
                                            name="allergies"
                                            control={control}
                                            render={({ field }) => {
                                                const currentValue = field.value === true ? "true" : field.value === false ? "false" : "";
                                                return (
                                                    <Select 
                                                        onValueChange={(value) => {
                                                            console.log("allergies changing from", field.value, "to", value);
                                                            field.onChange(value === "true");
                                                        }} 
                                                        value={currentValue}
                                                        key={`allergies-${currentValue}`}
                                                    >
                                                        <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                                            <SelectValue placeholder="Select option" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="true">Yes</SelectItem>
                                                            <SelectItem value="false">No</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Physical disabilities
                                        </label>
                                        <Controller
                                            name="physical_disabilities"
                                            control={control}
                                            render={({ field }) => {
                                                const currentValue = field.value === true ? "true" : field.value === false ? "false" : "";
                                                return (
                                                    <Select 
                                                        onValueChange={(value) => field.onChange(value === "true")} 
                                                        value={currentValue}
                                                        key={`physical_disabilities-${currentValue}`}
                                                    >
                                                        <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                                            <SelectValue placeholder="Select option" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="true">Yes</SelectItem>
                                                            <SelectItem value="false">No</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 ">
                                <h4 className="text-md font-medium text-gray-600 mb-4">Past and existing illnesses</h4>
                                {/* Left Column */}
                                <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Mental illness */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Mental illness
                                        </label>
                                        <Controller
                                            name="mental_illness"
                                            control={control}
                                            render={({ field }) => {
                                                const currentValue = field.value === true ? "true" : field.value === false ? "false" : "";
                                                return (
                                                    <Select 
                                                        onValueChange={(value) => field.onChange(value === "true")} 
                                                        value={currentValue}
                                                        key={`mental_illness-${currentValue}`}
                                                    >
                                                        <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                                            <SelectValue placeholder="Select option" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="true">Yes</SelectItem>
                                                            <SelectItem value="false">No</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                );
                                            }}
                                        />
                                    </div>
                                    {/* Epilepsy */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Epilepsy
                                        </label>
                                        <Controller
                                            name="epilepsy"
                                            control={control}
                                            render={({ field }) => {
                                                const currentValue = field.value === true ? "true" : field.value === false ? "false" : "";
                                                return (
                                                    <Select 
                                                        onValueChange={(value) => field.onChange(value === "true")} 
                                                        value={currentValue}
                                                        key={`epilepsy-${currentValue}`}
                                                    >
                                                        <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                                            <SelectValue placeholder="Select option" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="true">Yes</SelectItem>
                                                            <SelectItem value="false">No</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                );
                                            }}
                                        />
                                    </div>
                                    {/* Asthma */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Asthma
                                        </label>
                                        <Controller
                                            name="asthma"
                                            control={control}
                                            render={({ field }) => {
                                                const currentValue = field.value === true ? "true" : field.value === false ? "false" : "";
                                                return (
                                                    <Select 
                                                        onValueChange={(value) => field.onChange(value === "true")} 
                                                        value={currentValue}
                                                        key={`asthma-${currentValue}`}
                                                    >
                                                        <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                                            <SelectValue placeholder="Select option" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="true">Yes</SelectItem>
                                                            <SelectItem value="false">No</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                );
                                            }}
                                        />
                                    </div>

                                    {/* Diabetes */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Diabetes
                                        </label>
                                        <Controller
                                            name="diabetes"
                                            control={control}
                                            render={({ field }) => {
                                                const currentValue = field.value === true ? "true" : field.value === false ? "false" : "";
                                                return (
                                                    <Select 
                                                        onValueChange={(value) => field.onChange(value === "true")} 
                                                        value={currentValue}
                                                        key={`diabetes-${currentValue}`}
                                                    >
                                                        <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                                            <SelectValue placeholder="Select option" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="true">Yes</SelectItem>
                                                            <SelectItem value="false">No</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                );
                                            }}
                                        />
                                    </div>

                                    {/* Hypertension */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Hypertension
                                        </label>
                                        <Controller
                                            name="hypertension"
                                            control={control}
                                            render={({ field }) => {
                                                const currentValue = field.value === true ? "true" : field.value === false ? "false" : "";
                                                return (
                                                    <Select 
                                                        onValueChange={(value) => field.onChange(value === "true")} 
                                                        value={currentValue}
                                                        key={`hypertension-${currentValue}`}
                                                    >
                                                        <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                                            <SelectValue placeholder="Select option" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="true">Yes</SelectItem>
                                                            <SelectItem value="false">No</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                );
                                            }}
                                        />
                                    </div>
                                    {/* Tuberculosis */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Tuberculosis
                                        </label>
                                        <Controller
                                            name="tuberculosis"
                                            control={control}
                                            render={({ field }) => {
                                                const currentValue = field.value === true ? "true" : field.value === false ? "false" : "";
                                                return (
                                                    <Select 
                                                        onValueChange={(value) => field.onChange(value === "true")} 
                                                        value={currentValue}
                                                        key={`tuberculosis-${currentValue}`}
                                                    >
                                                        <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                                            <SelectValue placeholder="Select option" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="true">Yes</SelectItem>
                                                            <SelectItem value="false">No</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                );
                                            }}
                                        />
                                    </div>
                                    {/* Heart disease */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Heart disease
                                        </label>
                                        <Controller
                                            name="heart_disease"
                                            control={control}
                                            render={({ field }) => {
                                                const currentValue = field.value === true ? "true" : field.value === false ? "false" : "";
                                                return (
                                                    <Select 
                                                        onValueChange={(value) => field.onChange(value === "true")} 
                                                        value={currentValue}
                                                        key={`heart_disease-${currentValue}`}
                                                    >
                                                        <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                                            <SelectValue placeholder="Select option" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="true">Yes</SelectItem>
                                                            <SelectItem value="false">No</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                );
                                            }}
                                        />
                                    </div>
                                    {/* Malaria */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Malaria
                                        </label>
                                        <Controller
                                            name="malaria"
                                            control={control}
                                            render={({ field }) => {
                                                const currentValue = field.value === true ? "true" : field.value === false ? "false" : "";
                                                return (
                                                    <Select 
                                                        onValueChange={(value) => field.onChange(value === "true")} 
                                                        value={currentValue}
                                                        key={`malaria-${currentValue}`}
                                                    >
                                                        <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                                            <SelectValue placeholder="Select option" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="true">Yes</SelectItem>
                                                            <SelectItem value="false">No</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                );
                                            }}
                                        />
                                    </div>



                                    {/* Operations */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Operations
                                        </label>
                                        <Controller
                                            name="operations"
                                            control={control}
                                            render={({ field }) => {
                                                const currentValue = field.value === true ? "true" : field.value === false ? "false" : "";
                                                return (
                                                    <Select 
                                                        onValueChange={(value) => field.onChange(value === "true")} 
                                                        value={currentValue}
                                                        key={`operations-${currentValue}`}
                                                    >
                                                        <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                                            <SelectValue placeholder="Select option" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="true">Yes</SelectItem>
                                                            <SelectItem value="false">No</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="relative mt-4 ">
                                <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                    Others
                                </label>
                                <Textarea
                                    placeholder="any..."
                                    rows={3}
                                    {...register("others")}
                                    className="w-full !p-4"
                                />
                            </div>
                            <div className="space-y-4 mt-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Dietary restrictions */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Dietary restrictions
                                        </label>
                                        <Controller
                                            name="dietary_restrictions"
                                            control={control}
                                            render={({ field }) => {
                                                const currentValue = field.value === true ? "true" : field.value === false ? "false" : "";
                                                return (
                                                    <Select 
                                                        onValueChange={(value) => field.onChange(value === "true")} 
                                                        value={currentValue}
                                                        key={`dietary_restrictions-${currentValue}`}
                                                    >
                                                        <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                                            <SelectValue placeholder="Select option" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="true">Yes</SelectItem>
                                                            <SelectItem value="false">No</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                );
                                            }}
                                        />
                                    </div>

                                    {/* Preference for rest day */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Preference for rest day
                                        </label>
                                        <Controller
                                            name="preference_for_rest_days"
                                            control={control}
                                            render={({ field }) => {
                                                const currentValue = field.value === true ? "true" : field.value === false ? "false" : "";
                                                return (
                                                    <Select 
                                                        onValueChange={(value) => field.onChange(value === "true")} 
                                                        value={currentValue}
                                                        key={`preference_for_rest_days-${currentValue}`}
                                                    >
                                                        <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                                            <SelectValue placeholder="Select option" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="true">Yes</SelectItem>
                                                            <SelectItem value="false">No</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-8">
                            <ButtonReuseable
                                type="button"
                                title="Back"
                                icon={<FiChevronLeft className="w-4 h-4" />}
                                className="!bg-whiteColor !border border-primaryColor !text-primaryColor !px-5"
                                onClick={onBack}
                            />
                            <ButtonReuseable
                                type="submit"
                                title={isSubmitting ? "Submitting..." : "Next >"}
                                className=" !px-5"
                                loading={isSubmitting}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
