"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { FiPlus, FiSearch } from "react-icons/fi";
import { GrEdit } from "react-icons/gr";
import { MdOutlineSimCardDownload } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import DynamicTableTwo from "../common/DynamicTableTwo";
import ButtonReuseable from "../reusable/CustomButton";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
function Biodatapage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All Status");
    const [selectedNationality, setSelectedNationality] = useState("Nationality");
    const [dob, setDob] = useState<Date | undefined>()
    // Biodata demo data matching the table structure from the image
    const biodataData = [
        {
            id: 1,
            name: "Courtney Henry",
            age: 28,
            language: "English, Tagalog",
            experience: "5 years",
            nationality: "Philippines",
            skills: "Cooking, Cleaning, Childcare",
            status: "Available"
        },
        {
            id: 2,
            name: "Wade Warren",
            age: 32,
            language: "English, Bahasa",
            experience: "3 years",
            nationality: "Indonesia",
            skills: "Cooking, Cleaning, Childcare",
            status: "Not Available"
        },
        {
            id: 3,
            name: "Dianne Russell",
            age: 35,
            language: "English, Burmese",
            experience: "4 years",
            nationality: "Myanmar",
            skills: "Cooking, Cleaning, Childcare",
            status: "Available"
        },
        {
            id: 4,
            name: "Guy Hawkins",
            age: 29,
            language: "English, Tagalog",
            experience: "2 years",
            nationality: "Indonesia",
            skills: "Cleaning, Eldercare",
            status: "Confirmed"
        },
        {
            id: 5,
            name: "Arlene McCoy",
            age: 28,
            language: "English, Bahasa",
            experience: "5 years",
            nationality: "Myanmar",
            skills: "Cooking, Cleaning, Childcare",
            status: "Not Available"
        },
        {
            id: 6,
            name: "Savannah Nguyen",
            age: 34,
            language: "English, Burmese",
            experience: "6 years",
            nationality: "Indonesia",
            skills: "Cooking, Cleaning",
            status: "Available"
        },
        {
            id: 7,
            name: "Savannah Nguyen",
            age: 28,
            language: "English, Tagalog",
            experience: "5 years",
            nationality: "Philippines",
            skills: "Cooking, Childcare",
            status: "Confirmed"
        },
        {
            id: 8,
            name: "Savannah Nguyen",
            age: 40,
            language: "English, Burmese",
            experience: "3 years",
            nationality: "Indonesia",
            skills: "Cooking, Childcare",
            status: "Available"
        },
        {
            id: 9,
            name: "Savannah Nguyen",
            age: 40,
            language: "English, Tagalog",
            experience: "5 years",
            nationality: "Myanmar",
            skills: "Cooking, Cleaning, Childcare",
            status: "Available"
        }
    ];

    const columns = [
        {
            label: "Name",
            accessor: "name",
            width: "120px",
            formatter: (value: string) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                            {value.split(' ').map(n => n[0]).join('')}
                        </span>
                    </div>
                    <span className="text-sm font-medium">{value}</span>
                </div>
            ),
        },
        {
            label: "Age",
            accessor: "age",
            width: "80px",
            formatter: (value: number) => (
                <span className="text-sm">{value}</span>
            ),
        },
        {
            label: "Language",
            accessor: "language",
            width: "150px",
            formatter: (value: string) => (
                <span className="text-sm">{value}</span>
            ),
        },
        {
            label: "Experience",
            accessor: "experience",
            width: "100px",
            formatter: (value: string) => (
                <span className="text-sm">{value}</span>
            ),
        },
        {
            label: "Nationality",
            accessor: "nationality",
            width: "120px",
            formatter: (value: string) => (
                <span className="text-sm">{value}</span>
            ),
        },
        {
            label: "Skills",
            accessor: "skills",
            width: "200px",
            formatter: (value: string) => (
                <span className="text-sm">{value}</span>
            ),
        },
        {
            label: "Status",
            accessor: "status",
            width: "120px",
            formatter: (value: string) => (
                <div className={`px-3 py-2 rounded-md text-xs w-[100%] text-center font-semibold ${value === "Available"
                        ? "bg-greenColor/15 text-greenColor"
                        : value === "Not Available" ? "bg-redColor/15 text-redColor" :
                            "bg-ratingColor/15 text-ratingColor"
                    }`}>
                    {value}
                </div>

            ),
        },
        {
            label: "Action",
            accessor: "action",
            width: "80px",
            formatter: (_: any, record: any) => {
                return (
                    <div className="flex gap-2 items-center">
                    <button className="w-8 h-8 cursor-pointer bg-primaryColor text-white rounded-md flex items-center justify-center transition-colors">
                        <GrEdit size={17} />
                    </button>
                    <button className="w-8 h-8 cursor-pointer bg-primaryColor/40 text-headerColor rounded-md flex items-center justify-center transition-colors">
                        <BsFileEarmarkPdf size={17} />
                    </button>
                    <button className="w-8 h-8 cursor-pointer bg-redColor text-white rounded-md flex items-center justify-center transition-colors">
                        <RiDeleteBin6Line size={17} />
                    </button>
                    </div>
                );
            },
        },
    ];


    return (
        <section>
            <div className=" shadow p-6 bg-whiteColor rounded-md">
                {/* Header Section */}
                <div className="mb-6">
                    {/* Title and Action Buttons Row */}
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-2xl font-bold text-headerColor">
                            Biodata List
                        </h4>
                        <div className="flex items-center gap-3">
                            <Link href="/dashboard/biodata-management/biodata-step-one">
                            <ButtonReuseable
                                title="Add Biodata"
                                icon={<FiPlus className="w-4 h-4" />}
                                className="bg-primaryColor hover:bg-primaryColor/90"
                            />
                            </Link>
                        </div>
                    </div>

                    {/* Search and Filter Row */}
                    <div className="flex items-center gap-4">
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search Biodata"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                        </div>

                        {/* Filter Dropdowns */}
                        <div className="flex items-center gap-3">
                            {/* Status Filter */}
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-[140px] !h-12 bg-white border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                                    <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All Status">All Status</SelectItem>
                                    <SelectItem value="Available">Available</SelectItem>
                                    <SelectItem value="Not Available">Not Available</SelectItem>
                                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Nationality Filter */}
                            <Select value={selectedNationality} onValueChange={setSelectedNationality}>
                                <SelectTrigger className="w-[140px] !h-12 bg-white border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                                    <SelectValue placeholder="Nationality" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Nationality">Nationality</SelectItem>
                                    <SelectItem value="Philippines">Philippines</SelectItem>
                                    <SelectItem value="Indonesia">Indonesia</SelectItem>
                                    <SelectItem value="Myanmar">Myanmar</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Date Filter */}
                            <div>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full !h-10 lg:!h-12 justify-start text-left font-normal", !dob && "text-muted-foreground")}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dob ? format(dob, "PPP") : "Date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className=" p-0 ">
                                    <Calendar className=" " mode="single" selected={dob} onSelect={setDob} captionLayout="dropdown" />
                                </PopoverContent>
                            </Popover>
                            </div>
                        </div>
                        <ButtonReuseable
                            title="Download"
                            icon={<MdOutlineSimCardDownload size={20} />}
                            className="!bg-whiteColor border !border-primaryColor  !text-primaryColor"
                        />
                    </div>
                </div>

                <DynamicTableTwo
                    columns={columns}
                    data={biodataData}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={(page) => setCurrentPage(page)}
                    onItemsPerPageChange={(newItemsPerPage) => {
                        setItemsPerPage(newItemsPerPage);
                    }}
                    totalpage={Math.ceil(biodataData.length / itemsPerPage)}
                />
            </div>
        </section>
    );
}

export default Biodatapage;
