"use client"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import ButtonReuseable from "../reusable/CustomButton"

// Define types for the form options
interface SelectOption {
    value: string;
    label: string;
    description?: string;
}

export default function AddMaidEnquiry() {
    const [dob, setDob] = React.useState<Date | undefined>()
    const [transferDate, setTransferDate] = React.useState<Date | undefined>()
    const [hasEmployer, setHasEmployer] = React.useState<string>("")
    const [imagePreview, setImagePreview] = React.useState<string | null>(null)
    const imageRef = React.useRef<HTMLInputElement>(null)
    const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>([])

    // Arrays for multiple selections
    const [selectedHouseholdTypes, setSelectedHouseholdTypes] = React.useState<string[]>([])

    // Arrays of objects for select options
    const householdTypeOptions: SelectOption[] = [
        {
            value: "withChildren",
            label: "With Children / Ada Anak / 有小孩",
            description: "below 16 years old"
        },
        {
            value: "withElderly",
            label: "With Elderly / Ada Warga Emas / 有年长者"
        },
        {
            value: "withPets",
            label: "With Pets / Ada Haiwan Peliharaan / 有宠物",
            description: "what pets"
        },
        {
            value: "others",
            label: "Others / Lain-lain / 其他",
            description: "add remarks"
        }
    ];

    const languageOptions: SelectOption[] = [
        { value: "english", label: "English" },
        { value: "hindi", label: "Hindi" },
        { value: "tamil", label: "Tamil" },
        { value: "Bahasa_Indonesia", label: "Bahasa Indonesia" },
        { value: "Bahasa_Melayu", label: "Mandarin" },
        { value: "malay", label: "Malay" },
        // { value: "bahasa_melayu", label: "Bahasa Melayu" },
        // { value: "mandarin", label: "英文" },
        { value: "burmese", label: "Burmese" },
        { value: "tagalog", label: "Tagalog" },
    ];

    const salaryBudgetOptions: SelectOption[] = [
        { value: "$500-$600", label: "$500-$600" },
        { value: "$600-$700", label: "$600-$700" },
        { value: "$700-$800", label: "$700-$800" },
        { value: "Above $800", label: "Above $800" }
    ];

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

    // Helper functions to get label by value
    const getHouseholdTypeLabel = (value: string) => {
        const option = householdTypeOptions.find(opt => opt.value === value)
        if (option?.description) {
            return `${option.label} > ${option.description}`
        }
        return option?.label || value
    }

    const getLanguageLabel = (value: string) => {
        const option = languageOptions.find(opt => opt.value === value)
        return option?.label || value
    }

    // Add selection handlers
    const handleHouseholdTypeAdd = (value: string) => {
        if (!selectedHouseholdTypes.includes(value)) {
            setSelectedHouseholdTypes([...selectedHouseholdTypes, value])
        }
    }

    const handleLanguageAdd = (value: string) => {
        if (!selectedLanguages.includes(value)) {
            setSelectedLanguages([...selectedLanguages, value])
        }
    }

    // Remove selection handlers
    const handleHouseholdTypeRemove = (value: string) => {
        setSelectedHouseholdTypes(selectedHouseholdTypes.filter(item => item !== value))
    }

    const handleLanguageRemove = (value: string) => {
        setSelectedLanguages(selectedLanguages.filter(item => item !== value))
    }

    const onSubmit = (data: any) => {
        const formData = {
            ...data,
            householdTypes: selectedHouseholdTypes,
            languages: selectedLanguages,
            dob,
            transferDate,
            hasEmployer,
        }
        console.log("Submitted Data:", formData)
    }

const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold text-headerColor  mb-6 text-center">Employer Enquiry</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 space-y-4 gap-4">
                    <div className="col-span-2">
            {/* <div className="flex gap-4">
              <div>
                <Image src={imagePreview || "/empty-user.png"} alt="Uploaded Preview" width={100} height={100} className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover" />
              </div>
              <div>
                <button type="button" onClick={() => imageRef.current?.click()} className="text-base font-semibold text-primaryColor cursor-pointer">Upload photo</button>
                <input type="file" accept="image/*" onChange={handleImageUpload} hidden ref={imageRef} className="w-full border border-dashed p-6 rounded-xl hidden" />
                <p className="text-xs text-grayColor1 mt-1">Maximum photo size: 2MB</p>
              </div>
            </div> */}
          </div>
                    <div className="col-span-2 relative sm:col-span-2 mt-2">
                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">Full Name</label>
                        <Input placeholder="Enter your name" className="w-full !h-12 lg:!h-13 !pl-4" {...register("fullName", { required: true })} />
                    </div>

                    <div className="col-span-2 sm:col-span-1 relative mt-2">
                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block">Contact Number</label>
                        <Input placeholder="Enter your number" className="w-full !h-12 md:!h-13 !pl-4" {...register("contactNumber", { required: true })} />
                    </div>

                    <div className="col-span-2 sm:col-span-1 relative mt-2">
                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block">Email Address</label>
                        <Input placeholder="Enter your email" className="w-full !h-12 lg:!h-13 !pl-4" {...register("email", { required: true })} />
                    </div>

                    <div className="col-span-2 relative">
                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">Type of Household</label>
                        <Select onValueChange={handleHouseholdTypeAdd}>
                            <SelectTrigger className="w-full !h-12 md:!h-13 !pl-4">
                                <SelectValue placeholder="Select Household Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {householdTypeOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.description ? `${option.label} > ${option.description}` : option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {/* Selected Household Types */}
                        {selectedHouseholdTypes.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {selectedHouseholdTypes.map((value) => (
                                    <div key={value} className="flex items-center gap-2 bg-blackColor/10 text-headerColor pl-3 pr-1.5 py-1 rounded-full text-sm">
                                        <span>{getHouseholdTypeLabel(value)}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleHouseholdTypeRemove(value)}
                                            className="cursor-pointer bg-redColor/20 text-redColor rounded-full p-1"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="col-span-2 sm:col-span-1 relative">
                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">Preferred Languages</label>
                        <Select onValueChange={handleLanguageAdd}>
                            <SelectTrigger className="w-full !h-12 md:!h-13 !pl-4">
                                <SelectValue placeholder="Select Languages" />
                            </SelectTrigger>
                            <SelectContent>
                                {languageOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Selected Languages */}
                        {selectedLanguages.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {selectedLanguages.map((value) => (
                                    <div key={value} className="flex items-center gap-2 bg-blackColor/10 text-headerColor pl-3 pr-1.5 py-1 rounded-full text-sm">
                                        <span>{getLanguageLabel(value)}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleLanguageRemove(value)}
                                            className="cursor-pointer bg-redColor/20 text-redColor rounded-full p-1"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="col-span-2 sm:col-span-1 relative">
                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">Salary Budget Range</label>
                        <Controller
                            name="salaryBudget"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full !h-12 lg:!h-13 !pl-4">
                                        <SelectValue placeholder="Select Salary Range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {salaryBudgetOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div className="col-span-2 relative">
                        <label className="text-sm absolute -top-3 bg-white px-2 left-3 md:text-base block mb-1.5">Additional Requirements or Notes</label>
                        <Textarea placeholder="Type your message" rows={4} {...register("additionalInfo")} className="!p-4 h-20" />
                    </div>
                </div>
                <div className="pt-6">
                    <ButtonReuseable type="submit" title="Submit" className="w-full" />
                </div>
            </form>
        </div>
    )
}
