"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import ButtonReuseable from "../reusable/CustomButton";
import Link from "next/link";

export default function BiodataFormStepTwo() {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            allergies: "No",
            physicalDisabilities: "No",
            mentalIllness: "No",
            diabetes: "No",
            heartDisease: "No",
            epilepsy: "No",
            asthma: "No",
            hypertension: "No",
            malaria: "No",
            tuberculosis: "No",
            operations: "No",
            others: "",
            dietaryRestrictions: "No",
            preferenceForRestDay: "No"
        }
    });

    const onSubmit = (data: any) => {
        console.log("Biodata Step Two Submitted:", data);
        // Handle next step logic here
    };

    const onBack = () => {
        console.log("Go back to previous step");
        // Handle back navigation here
    };

    return (
        <section>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-headerColor">Biodata</h2>
                <ButtonReuseable
                    title="Add New Biodata"
                    icon={<FiPlus className="w-4 h-4" />}
                    className="bg-teal-500 hover:bg-teal-600"
                />
            </div>
            <div className="w-full border rounded-xl p-3 md:p-6">
                <div className="mb-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="md:p-6 p-3  rounded-xl bg-whiteColor border">
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
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Physical disabilities
                                        </label>
                                        <Controller
                                            name="physicalDisabilities"
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
                                            name="mentalIllness"
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
                                    {/* Epilepsy */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Epilepsy
                                        </label>
                                        <Controller
                                            name="epilepsy"
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
 {/* Asthma */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Asthma
                                        </label>
                                        <Controller
                                            name="asthma"
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

                                    {/* Diabetes */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Diabetes
                                        </label>
                                        <Controller
                                            name="diabetes"
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
  
                                    {/* Hypertension */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Hypertension
                                        </label>
                                        <Controller
                                            name="hypertension"
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
 {/* Tuberculosis */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Tuberculosis
                                        </label>
                                        <Controller
                                            name="tuberculosis"
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
                                    {/* Heart disease */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Heart disease
                                        </label>
                                        <Controller
                                            name="heartDisease"
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
                                    {/* Malaria */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Malaria
                                        </label>
                                        <Controller
                                            name="malaria"
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

                                   

                                    {/* Operations */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Operations
                                        </label>
                                        <Controller
                                            name="operations"
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
                                            name="dietaryRestrictions"
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

                                    {/* Preference for rest day */}
                                    <div className="relative">
                                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                            Preference for rest day
                                        </label>
                                        <Controller
                                            name="preferenceForRestDay"
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
                            </div>
                        </div>
                        <div className="flex justify-between mt-8">
                            <Link href="/dashboard/biodata-management/biodata-step-one">
                            <ButtonReuseable
                                type="button"
                                title="Back"
                                icon={<FiChevronLeft className="w-4 h-4" />}
                                className="bg-gray-500 hover:bg-gray-600 px-8"
                               
                            />
                            </Link>
                            <Link href="/dashboard/biodata-management/biodata-step-three">

                            <ButtonReuseable
                                type="submit"
                                title="Next"
                                icon={<FiChevronRight className="w-4 h-4" />}
                                className="bg-teal-500 hover:bg-teal-600 px-8"
                            />
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
