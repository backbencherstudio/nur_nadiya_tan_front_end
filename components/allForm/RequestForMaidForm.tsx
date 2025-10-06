"use client"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"

// Define types for the form options
interface SelectOption {
    value: string;
    label: string;
    description?: string;
}

export default function RequestForMaidForm({open,setOpen} :any) {
    const [dob, setDob] = React.useState<Date | undefined>()
    const [transferDate, setTransferDate] = React.useState<Date | undefined>()
    const [hasEmployer, setHasEmployer] = React.useState<string>("")
    const [imagePreview, setImagePreview] = React.useState<string | null>(null)
    const imageRef = React.useRef<HTMLInputElement>(null)

    // Arrays for multiple selections
    const [selectedHouseholdTypes, setSelectedHouseholdTypes] = React.useState<string[]>([])
    const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>([])

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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="md:!max-w-[710px] max-w-[90%] max-h-[90%] overflow-y-auto p-4 sm:p-7">
                <DialogHeader>
                    <h2 className="text-2xl font-semibold text-headerColor">Request for a Maid Form</h2>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div className="col-span-2">
                            <label className="text-sm md:text-base block mb-1.5">Full Name </label>
                            <Input placeholder="Enter your name" className="w-full !h-10 md:!h-12" {...register("fullName", { required: true })} />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <label className="text-sm md:text-base block mb-1.5">Contact Number </label>
                            <Input placeholder="Enter your number" className="w-full !h-10 md:!h-12" {...register("contactNumber", { required: true })} />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <label className="text-sm md:text-base block mb-1.5">Email Address </label>
                            <Input placeholder="Enter your email" className="w-full !h-10 md:!h-12" {...register("email", { required: true })} />
                        </div>

                        <div className="col-span-2 ">
                            <label className="text-sm md:text-base block mb-1.5">Type of Household </label>
                            <Select onValueChange={handleHouseholdTypeAdd}>
                                <SelectTrigger className="w-full !h-10 md:!h-12">
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

                        <div className="col-span-2 lg:col-span-1">
                            <label className="text-sm md:text-base block mb-1.5">Preferred Languages </label>
                            <Select onValueChange={handleLanguageAdd}>
                                <SelectTrigger className="w-full !h-10 md:!h-12">
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
                                                className=" cursor-pointer bg-redColor/20 text-redColor rounded-full p-1"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <label className="text-sm md:text-base block mb-1.5">Salary Budget Range</label>
                            <Controller
                                name="salaryBudget"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full !h-10 md:!h-12">
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

                        <div className="col-span-2">
                            <label className="text-sm md:text-base block mb-1.5">Additional Requirements or Notes </label>
                            <Textarea className=" h-[150px]" placeholder="Type your message"  {...register("additionalInfo")} />
                        </div>
                    </div>

                    <div className="pt-6">
                        <button className={`md:py-3 disabled:bg-grayColor1 disabled:text-white/50 disabled:cursor-not-allowed md:px-4 text-sm md:text-base justify-center flex items-center gap-2 py-2 px-3 rounded-sm cursor-pointer w-full text-white bg-primaryColor transition-all shadow-md duration-200 `}>
                            Submit
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
