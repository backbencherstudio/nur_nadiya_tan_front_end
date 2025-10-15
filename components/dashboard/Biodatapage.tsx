"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToken } from "@/hooks/useToken";
import { cn } from "@/lib/utils";
import { UserService } from "@/service/user/user.service";
import { useQuery } from "@tanstack/react-query";
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
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedNationality, setSelectedNationality] = useState("");
    const [dob, setDob] = useState<Date | undefined>()
    const { token } = useToken();
    // Biodata demo data matching the table structure from the image
   
    const columns = [
        {
            label: "Name",
            accessor: "full_name",
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
            accessor: "language_abilities",
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
                <div className={`px-3 py-2 rounded-md text-xs w-[100%] text-center font-semibold ${value === "available"
                        ? "bg-greenColor/15 text-greenColor"
                        : value === "not available" ? "bg-redColor/15 text-redColor" :
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
                    <Link href={`/dashboard/biodata-management/${record?.id}/biodata-preview/`} className="w-8 h-8 cursor-pointer bg-primaryColor/40 text-headerColor rounded-md flex items-center justify-center transition-colors">
                        <BsFileEarmarkPdf size={17} />
                    </Link>
                    <button className="w-8 h-8 cursor-pointer bg-redColor text-white rounded-md flex items-center justify-center transition-colors">
                        <RiDeleteBin6Line size={17} />
                    </button>
                    </div>
                );
            },
        },
    ];
   const buildQueryParams = () => {
      const params = new URLSearchParams()
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      if (selectedStatus) {
        params.append('status', selectedStatus);
      }
      if (selectedNationality !== "nationality") {
        params.append('nationality', selectedNationality);
      }
      if (dob) {
        params.append('date_to', dob.toISOString());
      }
       params.append('page', currentPage.toString());
    params.append('limit', itemsPerPage.toString());
      return params.toString();
   };
    const getBiodata = async () => {
    const response = await UserService.getBiodataList(queryString, token);
    return response?.data?.data;
   };
   const queryString = buildQueryParams();
   const { data, error:apiError, isLoading } = useQuery({
    queryKey: ["biodataData", searchTerm,currentPage, itemsPerPage, selectedStatus, selectedNationality, dob],
    queryFn: getBiodata,
    enabled: !!token,
   });  
   
  
console.log("data", data);
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
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="available">Available</SelectItem>
                                    <SelectItem value="not available">Not Available</SelectItem>
                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Nationality Filter */}
                            <Select value={selectedNationality} onValueChange={setSelectedNationality}>
                                <SelectTrigger className="w-[140px] !h-12 bg-white border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                                    <SelectValue placeholder="Nationality" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="nationality">Nationality</SelectItem>
                                    <SelectItem value="philippines">Philippines</SelectItem>
                                    <SelectItem value="indonesia">Indonesia</SelectItem>
                                    <SelectItem value="myanmar">Myanmar</SelectItem>
                                    <SelectItem value="bangladesh">Bangladesh</SelectItem>
                                </SelectContent>
                            </Select>
                            {/* Date Filter */}
                             <div className="flex relative items-center gap-2">
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
                             {dob && (
                               <button
                                 type="button"  
                                 onClick={() => { setDob(undefined); setTimeout(buildQueryParams(), 0); }}
                                 className=" h-6 w-6 border absolute -right-2 -top-2 bg-redColor/60 border-redColor rounded-full text-white cursor-pointer"
                                 aria-label="Clear date filter"
                               >
                                 ×
                               </button>
                             )}
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
                    data={data?.bioData}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={(page) => setCurrentPage(page)}
                    onItemsPerPageChange={(newItemsPerPage) => {
                        setItemsPerPage(newItemsPerPage);
                        setCurrentPage(1);
                    }}
                    error={(apiError as any)?.response?.data?.error}
                    totalpage={data?.pagination?.totalPages }
                    totalItems={data?.pagination?.totalCount}
                    loading={isLoading}
                />
            </div>
        </section>
    );
}

export default Biodatapage;
