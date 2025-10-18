import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"
import Image from "next/image"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import ButtonReuseable from "../reusable/CustomButton"

// Define types for the form options
interface SelectOption {
    value: string;
    label: string;
}

export default function TransferMaidForm({ open, setOpen, record }: {open: boolean, setOpen: (open: boolean) => void, record?: any}) {
    console.log("record", record);
    const [dob, setDob] = React.useState<Date | undefined>()
    const [transferDate, setTransferDate] = React.useState<Date | undefined>()
    const [hasEmployer, setHasEmployer] = React.useState<string>("")
    const [imagePreview, setImagePreview] = React.useState<string | null>(null)
    const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>([])
    const imageRef = React.useRef<HTMLInputElement>(null)
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

    const languageOptions: SelectOption[] = [
        { value: "english", label: "English" },
        { value: "hindi", label: "Hindi" },
        { value: "tamil", label: "Tamil" },
        { value: "Bahasa_Indonesia", label: "Bahasa Inggeris" },
        { value: "Bahasa_Melayu", label: "Mandarin" },
        { value: "malay", label: "Malay" },
        { value: "bahasa_melayu", label: "Bahasa Melayu" },
        { value: "mandarin", label: "英文" },
        { value: "burmese", label: "Burmese" },
        { value: "tagalog", label: "Tagalog" },
    ];

    const onSubmit = (data: any) => {
        const formData = {
            ...data,
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

    const getLanguageLabel = (value: string) => {
        const option = languageOptions.find(opt => opt.value === value)
        return option?.label || value
    }

    const handleLanguageAdd = (value: string) => {
        if (!selectedLanguages.includes(value)) {
            setSelectedLanguages([...selectedLanguages, value])
        }
    }

    const handleLanguageRemove = (value: string) => {
        setSelectedLanguages(selectedLanguages.filter(item => item !== value))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="md:!max-w-[710px] max-w-[90%] max-h-[90%] overflow-y-auto p-4 sm:p-7">
                <DialogHeader>
                    <h2 className="mt-4 text-xl font-semibold text-headerColor sm:mt-0">Transfer Maid Registration Form / Formulir Pendaftaran Pembantu</h2>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <div className=" flex gap-4">
                                <div>
                                        <Image src={imagePreview || "/empty-user.png"} alt="Uploaded Preview" width={100} height={100} className=" w-12 h-12 md:w-14 md:h-14 rounded-full object-cover" />
                                </div>
                                <div>
                                    <button onClick={() => imageRef.current?.click()} className="text-base font-semibold text-primaryColor cursor-pointer">Upload Photo(half body)</button>
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
                        </div>

                        <div className="col-span-2 ">
                            <label className="text-sm md:text-base block mb-1.5">Full name (as per passport)</label>
                            <Input placeholder="Enter your full name" className="w-full !h-10 lg:!h-12" {...register("fullName", { required: true })}  />
                        </div>

                        <div className="col-span-2 sm:col-span-1 ">
                            <label className="text-sm md:text-base block mb-1.5">Date of Birth</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full !h-10 lg:!h-12 justify-start text-left font-normal", !dob && "text-muted-foreground")}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dob ? format(dob, "PPP") : "Select Birthday date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 ">
                                    <Calendar className=" " mode="single" selected={dob} onSelect={setDob} captionLayout="dropdown" />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="col-span-2 sm:col-span-1 ">
                            <label className="text-sm md:text-base block mb-1.5">When can you transfer?</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full  !h-10 lg:!h-12 justify-start text-left font-normal", !transferDate && "text-muted-foreground")}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {transferDate ? format(transferDate, "PPP") : "Select Transfer date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar className="" mode="single" selected={transferDate} onSelect={setTransferDate} captionLayout="dropdown" />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="col-span-2 sm:col-span-1 ">
                            <label className="text-sm md:text-base block mb-1.5">WPN Number</label>
                            <Input placeholder="Enter your W/P/N number" {...register("wpnNumber")} className="!h-10 lg:!h-12"/>
                        </div>

                        <div className="col-span-2 sm:col-span-1 ">
                            <label className="text-sm md:text-base block mb-1.5">Mobile Number</label>
                            <Input placeholder="Enter your mobile number" {...register("mobileNumber")} className="!h-10 lg:!h-12" />
                        </div>

                        <div className="col-span-2 sm:col-span-1 ">
                            <label className="text-sm md:text-base block mb-1.5">Nationality</label>
                            <Controller
                                name="nationality"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full !h-10 lg:!h-12">
                                            <SelectValue placeholder="Select nationality" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="india">India</SelectItem>
                                            <SelectItem value="indonesian">Indonesian</SelectItem>
                                            <SelectItem value="filipino">Filipino</SelectItem>
                                            <SelectItem value="myanmar">Myanmar</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        <div className="col-span-2 sm:col-span-1 ">
                            <label className="text-sm md:text-base block mb-1.5">Languages Spoken</label>
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

                        <div className="col-span-2  ">
                            <label className="text-sm md:text-base block mb-1.5">Additional Info (Experience, No)</label>
                            <Textarea placeholder="Type your message" rows={4} {...register("additionalInfo")} />
                        </div>

                        <div className="col-span-2 ">
                            <p className="text-sm font-medium block mb-1.5">Do you have a current employer?</p>
                            <RadioGroup value={hasEmployer} onValueChange={setHasEmployer} className="flex gap-6">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem   value="yes" id="yes" />
                                    <label htmlFor="yes" className="text-sm font-medium cursor-pointer">
                                        Yes
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="no" />
                                    <label htmlFor="no" className="text-sm font-medium cursor-pointer">
                                        No
                                    </label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="pt-6">
                        <ButtonReuseable type="submit" title="Submit" className="w-full"/>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
