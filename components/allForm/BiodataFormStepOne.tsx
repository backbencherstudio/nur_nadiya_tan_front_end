"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import ButtonReuseable from "../reusable/CustomButton";
import Link from "next/link";

export default function BiodataFormStepOne() {
    const [dob, setDob] = React.useState<Date | undefined>();
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const imageRef = React.useRef<HTMLInputElement>(null);

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            fullName: "",
            placeOfBirth: "",
            height: "",
            portAirport: "",
            religion: "",
            ageOfChildren: "",
            nationality: "",
            weight: "",
            maritalStatus: " ",
            educationLevel: "",
            numberOfChildren: ""
        }
    });

    const onSubmit = (data: any) => {
        const formData = { ...data, dob };
        console.log("Biodata Step One Submitted:", formData);
        // Handle next step logic here
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <section>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-headerColor">Biodata</h2>
                <ButtonReuseable
                    title="Add New Biodata"
                    icon={<FiPlus className="w-4 h-4" />}
                    className=""
                />
            </div>
            <div className="w-full border rounded-xl p-6">

                {/* Personal Information Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 bg-whiteColor rounded-xl">

                        <h3 className="text-lg font-semibold text-headerColor/90 mb-6">Personal Information</h3>

                        {/* Photo Upload Section */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className=" flex gap-4">
                                <div>
                                    <Image src={imagePreview || "/empty-user.png"} alt="Uploaded Preview" width={100} height={100} className=" w-12 h-12 md:w-14 md:h-14 rounded-full object-cover" />
                                </div>
                                <div>
                                    <button onClick={() => imageRef.current?.click()} className="text-base font-semibold text-primaryColor cursor-pointer">Upload Photo</button>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        hidden
                                        ref={imageRef}
                                        className="w-full border border-dashed p-6 rounded-xl hidden"
                                    />
                                    <p className="text-xs text-grayColor1 mt-1">Maximum photo size: 2MB</p>
                                </div>
                            </div>
                            <div>

                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                ref={imageRef}
                                className="hidden"
                            />
                        </div>

                        {/* Form Fields - Two Column Layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Full Name */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Full Name<span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        placeholder="Enter full name"
                                        {...register("fullName", { required: true })}
                                        className="w-full !h-12 lg:!h-13 !pl-4"
                                    />
                                </div>

                                {/* Place of Birth */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Place of Birth
                                    </label>
                                    <Input
                                        placeholder="Enter place of birth"
                                        {...register("placeOfBirth")}
                                        className="w-full !h-12 lg:!h-13 !pl-4"
                                    />
                                </div>

                                {/* Height */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Height
                                    </label>
                                    <Input
                                        placeholder="Enter height"
                                        {...register("height")}
                                        className="w-full !h-12 lg:!h-13 !pl-4"
                                    />
                                </div>

                                {/* Name of port/Airport */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Name of port/Airport
                                    </label>
                                    <Input
                                        placeholder="Enter port/airport name"
                                        {...register("portAirport")}
                                        className="w-full !h-12 lg:!h-13 !pl-4"
                                    />
                                </div>

                                {/* Religion */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Religion
                                    </label>
                                    <Controller
                                        name="religion"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                                    <SelectValue placeholder="Select religion" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Islam">Islam</SelectItem>
                                                    <SelectItem value="Christianity">Christianity</SelectItem>
                                                    <SelectItem value="Hinduism">Hinduism</SelectItem>
                                                    <SelectItem value="Buddhism">Buddhism</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>

                                {/* Age of children */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Age of children
                                    </label>
                                    <Input
                                        placeholder="Enter age of children"
                                        {...register("ageOfChildren")}
                                        className="w-full !h-12 lg:!h-13 !pl-4"
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Date of Birth */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Date of Birth<span className="text-red-500">*</span>
                                    </label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full !h-12 lg:!h-13 !pl-4 justify-start text-left font-normal",
                                                    !dob && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {dob ? format(dob, "MM/dd/yyyy") : "mm/dd/yyyy"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={dob}
                                                onSelect={setDob}
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* Nationality */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Nationality
                                    </label>
                                    <Controller
                                        name="nationality"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                                    <SelectValue placeholder="Select nationality" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Philopenas">Philippines</SelectItem>
                                                    <SelectItem value="Indonesia">Indonesia</SelectItem>
                                                    <SelectItem value="Myanmar">Myanmar</SelectItem>
                                                    <SelectItem value="India">India</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>

                                {/* Weight */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Weight
                                    </label>
                                    <Input
                                        placeholder="Enter weight"
                                        {...register("weight")}
                                        className="w-full !h-12 lg:!h-13 !pl-4"
                                    />
                                </div>

                                {/* Marital Status */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Marital Status
                                    </label>
                                    <Controller
                                        name="maritalStatus"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                                    <SelectValue placeholder="Select marital status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Married">Married</SelectItem>
                                                    <SelectItem value="Single">Single</SelectItem>
                                                    <SelectItem value="Divorced">Divorced</SelectItem>
                                                    <SelectItem value="Widowed">Widowed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>

                                {/* Education level */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Education level
                                    </label>
                                    <Controller
                                        name="educationLevel"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                                    <SelectValue placeholder="Select education level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Senior High School">Senior High School</SelectItem>
                                                    <SelectItem value="Junior High School">Junior High School</SelectItem>
                                                    <SelectItem value="Elementary School">Elementary School</SelectItem>
                                                    <SelectItem value="College">College</SelectItem>
                                                    <SelectItem value="University">University</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>

                                {/* Number of children */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Number of children
                                    </label>
                                    <Controller
                                        name="numberOfChildren"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                                    <SelectValue placeholder="Select number of children" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="0">0</SelectItem>
                                                    <SelectItem value="1">1</SelectItem>
                                                    <SelectItem value="2">2</SelectItem>
                                                    <SelectItem value="3">3</SelectItem>
                                                    <SelectItem value="4">4</SelectItem>
                                                    <SelectItem value="5+">5+</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Next Button */}
                    <div className="flex justify-end mt-8">
                        <Link href="/dashboard/biodata-management/biodata-step-two">
                        <ButtonReuseable
                            type="submit"
                            title="Next >"
                            className=" !px-5"
                        />
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
