"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BiodataStepOne, getBiodataStep, saveBiodataStep } from "@/helper/biodataStorage.helper";
import { cn } from "@/lib/utils";
import { ImageContext } from "@/provider/ImageProvider";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ButtonReuseable from "../reusable/CustomButton";

export default function BiodataFormStepOne() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dob, setDob] = React.useState<Date | undefined>();
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const imageRef = React.useRef<HTMLInputElement>(null);
   const { image, setImage } = useContext(ImageContext);
    const { register, handleSubmit, control, formState: { errors }, reset, setError, clearErrors } = useForm<BiodataStepOne>({
        defaultValues: {
            full_name: "",
            place_of_birth: "",
            height: "",
            name_of_airPort: "",
            religion: "",
            age_of_childern: "",
            nationality: "",
            weight: "",
            marital_status: " ",
            education_level: "",
            number_of_childern: ""
        }
    });

    // Load existing data on component mount
    React.useEffect(() => {
        const existingData = getBiodataStep('stepOne');
        console.log("existingData",existingData);
        if (existingData) {
            // Add a small delay to ensure proper initialization
            setTimeout(() => {
                reset(existingData);
            }, 100);
            
            if (existingData.date_of_birth) {
                try {
                    const dateValue = new Date(existingData.date_of_birth);
                    if (!isNaN(dateValue.getTime())) {
                        setDob(dateValue);
                    }
                } catch (error) {
                    console.error("Invalid date value:", existingData.date_of_birth);
                }
            }
            
            if (existingData.imagePreview) {
                setImagePreview(existingData.imagePreview);
            }
        }
    }, [reset]);

    const onSubmit = (data: BiodataStepOne) => {
        setIsSubmitting(true);
        // validate required date
        if (!dob || isNaN(dob.getTime())) {
            setError("date_of_birth" as any, { type: "manual", message: "Date of birth is required" });
           
            return;
        } else {
            clearErrors("date_of_birth" as any);
        }
            const formData = { 
            ...data, 
            date_of_birth: dob, 
            imagePreview: imagePreview || "/empty-user.png",
        };
        console.log("Biodata Step One Submitted:", image);
        // Save to localStorage
        const saved = saveBiodataStep('stepOne', formData);
        if (saved) {
            console.log("Data saved to localStorage successfully");
            router.push("/dashboard/biodata-management/biodata-step-two");
        } else {
            console.error("Failed to save data to localStorage");
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
             setImage(event.target.files[0]);            
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
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
                                    <button type="button" aria-label="Upload Photo" onClick={() => imageRef.current?.click()} className="text-base font-semibold text-primaryColor cursor-pointer">Upload Photo</button>
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
                                        type="text"
                                        placeholder="Enter full name"
                                        {...register("full_name", { required: "Full name is required" })}
                                        className="w-full !h-12 lg:!h-13 !pl-4"
                                    />
                                    {errors.full_name && <p className="text-xs text-red-500 mt-1">{String(errors.full_name.message)}</p>}
                                </div>

                                {/* Place of Birth */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Place of Birth
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter place of birth"
                                        {...register("place_of_birth", { required: "Place of birth is required" })}
                                        className="w-full !h-12 lg:!h-13 !pl-4"
                                    />
                                    {errors.place_of_birth && <p className="text-xs text-red-500 mt-1">{String(errors.place_of_birth.message)}</p>}
                                </div>

                                {/* Height */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Height
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder="Enter height in cm"
                                        {...register("height", { required: "Height is required" })}
                                        className="w-full !h-12 lg:!h-13 !pl-4"
                                    />
                                    {errors.height && <p className="text-xs text-red-500 mt-1">{String(errors.height.message)}</p>}
                                </div>

                                {/* Name of port/Airport */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Name of port/Airport
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter port/airport name"
                                        {...register("name_of_airPort", { required: "Airport name is required" })}
                                        className="w-full !h-12 lg:!h-13 !pl-4"
                                    />
                                    {errors.name_of_airPort && <p className="text-xs text-red-500 mt-1">{String((errors as any).name_of_airPort?.message)}</p>}
                                </div>

                                {/* Religion */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Religion
                                    </label>
                                    <Controller
                                        name="religion"
                                        control={control}
                                        rules={{ required: "Religion is required" }}
                                        render={({ field }) => {
                                            const currentValue = field.value || "";
                                            return (
                                                <Select 
                                                    onValueChange={field.onChange} 
                                                    value={currentValue}
                                                    key={`religion-${currentValue}`}
                                                >
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
                                            );
                                        }}
                                    />
                                    {errors.religion && <p className="text-xs text-red-500 mt-1">{String(errors.religion.message)}</p>}
                                </div>

                                {/* Age of children */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Age of children
                                    </label>
                                    <Input
                                    type="number"
                                        placeholder="Enter age of children"
                                        {...register("age_of_childern", { required: "Age of children is required" })}
                                        className="w-full !h-12 lg:!h-13 !pl-4"
                                    />
                                    {errors.age_of_childern && <p className="text-xs text-red-500 mt-1">{String((errors as any).age_of_childern?.message)}</p>}
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
                                                {dob && !isNaN(dob.getTime()) ? format(dob, "MM/dd/yyyy") : "mm/dd/yyyy"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={dob}
                                                onSelect={(date) => {
                                                    if (date && !isNaN(date.getTime())) {
                                                        setDob(date);
                                                    }
                                                }}
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {errors.date_of_birth && <p className="text-xs text-red-500 mt-1">{String((errors as any).date_of_birth?.message)}</p>}
                                </div>

                                {/* Nationality */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Nationality
                                    </label>
                                    <Controller
                                        name="nationality"
                                        control={control}
                                        rules={{ required: "Nationality is required" }}
                                        render={({ field }) => {
                                            const currentValue = field.value || "";
                                            return (
                                                <Select 
                                                    onValueChange={field.onChange} 
                                                    value={currentValue}
                                                    key={`nationality-${currentValue}`}
                                                >
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
                                            );
                                        }}
                                    />
                                    {errors.nationality && <p className="text-xs text-red-500 mt-1">{String(errors.nationality.message)}</p>}
                                </div>

                                {/* Weight */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Weight
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder="Enter weight"
                                        {...register("weight", { required: "Weight is required" })}
                                        className="w-full !h-12 lg:!h-13 !pl-4"
                                    />
                                    {errors.weight && <p className="text-xs text-red-500 mt-1">{String(errors.weight.message)}</p>}
                                </div>

                                {/* Marital Status */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Marital Status
                                    </label>
                                    <Controller
                                        name="marital_status"
                                        control={control}
                                        rules={{ required: "Marital status is required" }}
                                        render={({ field }) => {
                                            const currentValue = field.value || "";
                                            return (
                                                <Select 
                                                    onValueChange={field.onChange} 
                                                    value={currentValue}
                                                    key={`marital_status-${currentValue}`}
                                                >
                                                    <SelectTrigger className="w-full !h-12 text-black lg:!h-13 !pl-4">
                                                        <SelectValue placeholder="Select marital status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Married">Married</SelectItem>
                                                        <SelectItem value="Single">Single</SelectItem>
                                                        <SelectItem value="Divorced">Divorced</SelectItem>
                                                        <SelectItem value="Widowed">Widowed</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            );
                                        }}
                                    />
                                    {errors.marital_status && <p className="text-xs text-red-500 mt-1">{String((errors as any).marital_status?.message)}</p>}
                                </div>

                                {/* Education level */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Education level
                                    </label>
                                    <Controller
                                        name="education_level"
                                        control={control}
                                        rules={{ required: "Education level is required" }}
                                        render={({ field }) => {
                                            const currentValue = field.value || "";
                                            return (
                                                <Select 
                                                    onValueChange={field.onChange} 
                                                    value={currentValue}
                                                    key={`education_level-${currentValue}`}
                                                >
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
                                            );
                                        }}
                                    />
                                    {errors.education_level && <p className="text-xs text-red-500 mt-1">{String(errors.education_level.message)}</p>}
                                </div>

                                {/* Number of children */}
                                <div className="relative">
                                    <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">
                                        Number of children
                                    </label>
                                    <Controller
                                     name="number_of_childern"
                                        control={control}
                                        rules={{ required: "Number of children is required" }}
                                        render={({ field }) => {
                                            const currentValue = field.value || "";
                                            return (
                                                <Select 
                                                    onValueChange={field.onChange} 
                                                    value={currentValue}
                                                    key={`number_of_childern-${currentValue}`}
                                                >
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
                                            );
                                        }}
                                    />
                                    {errors.number_of_childern && <p className="text-xs text-red-500 mt-1">{String((errors as any).number_of_childern?.message)}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Next Button */}
                    <div className="flex justify-end mt-8">
                        <ButtonReuseable
                            type="submit"
                            title="Next >"
                            className="!px-5"
                            loading={isSubmitting}
                            sendingMsg="Submitting..."
                        />
                    </div>
                </form>
            </div>
        </section>
    );
}
