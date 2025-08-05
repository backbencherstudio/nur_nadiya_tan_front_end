"use client"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"

export default function RequestForMaidForm() {
    const [dob, setDob] = React.useState<Date | undefined>()
    const [transferDate, setTransferDate] = React.useState<Date | undefined>()
    const [hasEmployer, setHasEmployer] = React.useState<string>("")
    const [imagePreview, setImagePreview] = React.useState<string | null>(null)
    const imageRef = React.useRef<HTMLInputElement>(null)
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

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

    return (
        <section className=" py-14 lg:py-[60px] mx-4">
        <div className="max-w-[992px] border mx-auto p-4 rounded-2xl sm:p-7 ">
            <h2 className="text-2xl font-semibold text-headerColor">Request for a Maid Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   

                    <div className="col-span-2">
                        <label className="text-sm md:text-base block mb-1.5">Full Name (Nama Penuh / 姓名)</label>
                        <Input placeholder="Enter your name" className="w-full !h-10 md:!h-12" {...register("fullName", { required: true })} />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <label className="text-sm md:text-base block mb-1.5">Contact Number (Nombor Telefon / 联系号码)</label>
                        <Input placeholder="Enter your number" className="w-full !h-10 md:!h-12" {...register("contactNumber", { required: true })} />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <label className="text-sm md:text-base block mb-1.5">Email Address (Alamat Emel / 电邮地址)</label>
                        <Input placeholder="Enter your email" className="w-full !h-10 md:!h-12" {...register("email", { required: true })} />
                    </div>

                    <div className="col-span-2 ">
                        <label className="text-sm md:text-base block mb-1.5">Type of Household (Jenis Isi Rumah  / 家庭类型)</label>
                        <Controller
                            name="householdType"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full !h-10 md:!h-12">
                                        <SelectValue placeholder="Select Household Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="withChildren">{ `With Children > / Ada Anak / 有小孩 below 16 years old`}</SelectItem>
                                        <SelectItem value="withoutChildren">{`With Elderly"> With Elderly / Ada Warga Emas / 有年长者`}</SelectItem>
                                        <SelectItem value="Peliharaan">{`With Pets"> With Pets / Ada Haiwan Peliharaan / 有宠物 , what pets`}</SelectItem>
                                        <SelectItem value="remarks">{`Others"> Others / Lain-lain / 其他 > add remarks`}</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <label className="text-sm md:text-base block mb-1.5">Preferred Languages (Bahasa Pilihan  / 语言要求)</label>
                        <Controller
                            name="languages"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full !h-10 md:!h-12">
                                        <SelectValue placeholder="Select Languages" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="english">{ `English"> English / Bahasa Inggeris / 英文
`}</SelectItem>
                                        <SelectItem value="mandarin">{ `Mandarin"> Mandarin / Mandarin / 华语
`}</SelectItem>
                                        <SelectItem value="malay">{ `Malay"> Malay / Bahasa Melayu / 马来语
`}</SelectItem>
                                        <SelectItem value="others">{ `Others"> Others / Lain-lain / 其他
`}</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <label className="text-sm md:text-base block mb-1.5">Salary Budget Range (Anggaran Gaji / 期望薪资范围)</label>
                        <Controller
                            name="salaryBudget"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full !h-10 md:!h-12">
                                        <SelectValue placeholder="Select Salary Range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="$500-$600">$500-$600</SelectItem>
                                        <SelectItem value="$600-$700">$600-$700</SelectItem>
                                        <SelectItem value="$700–$800">$700–$800</SelectItem>
                                        <SelectItem value="Above $800">Above $800</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="text-sm md:text-base block mb-1.5">Additional Requirements or Notes (Keperluan Tambahan / 其他需求或备注)</label>
                        <Textarea className=" h-[150px]" placeholder="Type your message"  {...register("additionalInfo")} />
                    </div>
                </div>

                <div className="pt-6">
                   <button   className={`md:py-3 disabled:bg-grayColor1 disabled:text-white/50 disabled:cursor-not-allowed md:px-4 text-sm md:text-base justify-center flex items-center gap-2 py-2 px-3 rounded-sm cursor-pointer w-full text-white bg-primaryColor transition-all shadow-md duration-200 `}>
                  Submite
                   </button>
                </div>
            </form>
        </div>
        </section>
    )
}
