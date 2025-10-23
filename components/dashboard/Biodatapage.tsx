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
import { Fetch } from "@/lib/Fetch";
import { cn } from "@/lib/utils";
import { UserService } from "@/service/user/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { FiPlus, FiSearch } from "react-icons/fi";
import { GrEdit } from "react-icons/gr";
import { MdOutlineSimCardDownload } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
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
    const [deletingId, setDeletingId] = useState<string | null>(null);
      const [loadingStatusId, setLoadingStatusId] = useState<string | null>(null);
    const { token } = useToken();
    // Biodata demo data matching the table structure from the image
   const queryClient = useQueryClient()
     const handle_status_change = async (new_status: string, record: any) => {
    try {
      setLoadingStatusId(record?.id);
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await Fetch.patch(
        `/admin/change-bio-status/${record?.id}`,
        { status: new_status },
        header
      );
      
      if (response?.data?.success) {
        // Refetch the data
        queryClient.invalidateQueries({ queryKey: ["biodataData"] });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoadingStatusId(null);
    }
  };

  // Handle PDF export for biodata
  const handle_export_pdf = () => {
    if (!data?.bioData || data.bioData.length === 0) {
      toast.error("No biodata records to export");
      return;
    }

    const doc = new jsPDF();
    
    // Add header with title and date
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Biodata List Report", 14, 20);
    
    // Add subtitle with filter info
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const filter_status = selectedStatus === "all" || selectedStatus === "" ? "All Status" : selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1);
    const filter_nationality = selectedNationality === "nationality" || selectedNationality === "" ? "All Nationalities" : selectedNationality.charAt(0).toUpperCase() + selectedNationality.slice(1);
    doc.text(`Filter Status: ${filter_status}`, 14, 30);
    doc.text(`Filter Nationality: ${filter_nationality}`, 14, 36);
    doc.text(`Generated on: ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`, 14, 42);
    doc.text(`Total Records: ${data.bioData.length}`, 14, 48);
    
    // Add a line separator
    doc.setLineWidth(0.5);
    doc.line(14, 54, 196, 54);

    // Prepare table columns
    const tableColumn = [
      "Name",
      "Age",
      "Language",
      "Experience",
      "Nationality",
      "Skills",
      "Status"
    ];

    // Prepare table rows with better data formatting
    const tableRows = data.bioData.map((item: any) => [
      item.full_name || "-",
      item.age || "-",
      item.language_abilities || "-",
      item.experience || "-",
      item.nationality || "-",
      item.skills || "-",
      item.status || "-"
    ]);

    // Add table with improved styling
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      styles: { 
        fontSize: 9,
        cellPadding: 3,
        overflow: 'linebreak',
        halign: 'left'
      },
      headStyles: { 
        fillColor: [0, 104, 239],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { cellWidth: 35 }, // Name
        1: { halign: 'center', cellWidth: 15 }, // Age
        2: { cellWidth: 25 }, // Language
        3: { halign: 'center', cellWidth: 20 }, // Experience
        4: { cellWidth: 25 }, // Nationality
        5: { cellWidth: 30 }, // Skills
        6: { halign: 'center', cellWidth: 20 } // Status
      },
      margin: { left: 14, right: 14 },
      tableWidth: 'auto'
    });

    // Add footer with page info
    const pageCount = (doc as any).internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(`Page ${i} of ${pageCount}`, 14, (doc as any).internal.pageSize.height - 10);
      doc.text("Generated by Admin Dashboard", (doc as any).internal.pageSize.width - 60, (doc as any).internal.pageSize.height - 10);
    }

    // Generate filename with timestamp
    const timestamp = dayjs().format("YYYY-MM-DD_HH-mm-ss");
    const filename = `biodata_${selectedStatus || "all"}_${timestamp}.pdf`;
    
    doc.save(filename);
  };

    const columns = [
        {
            label: "Name",
            accessor: "full_name",
            width: "200px",
            formatter: (value: string, record: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                            {record?.image ? <Image src={`${record?.image}`} alt="Uploaded Preview" width={100} height={100} className=" w-10 h-10 rounded-full object-cover" /> : value?.split(' ')?.map(n => n[0])?.join('')}
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
            width: "160px",
            formatter: (value: string) => (
                <span className="text-sm">{value}</span>
            ),
        },
        {
            label: "Status",
            accessor: "status",
            width: "120px",
           formatter: (value: string, record: any) => (
        <div className="change-arrow">
        <Select 
          value={value || "uncontacted"} 
          onValueChange={(new_status) => handle_status_change(new_status, record)}
          disabled={loadingStatusId === record?._id}
        >
          <SelectTrigger className={`w-full change-arrow h-10 text-xs !justify-center focus-visible:ring-ring/50 focus-visible:ring-0 font-semibold rounded-md border-0 ${
            value === "available"
              ? "bg-greenColor/15 text-greenColor"
              : value === "confirmed"
              ? "bg-yellow-500/15 text-yellow-500"
              : "bg-redColor/15 text-redColor"
          }`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="">
            <SelectItem className={"bg-redColor/15 text-redColor !mb-1"} value="not available">Not Available</SelectItem>
            <SelectItem className={"bg-greenColor/15 text-greenColor !mb-1"} value="available">Available</SelectItem>
            <SelectItem className={"bg-yellow-500/15 text-yellow-500"} value="confirmed">Confirmed</SelectItem>
          </SelectContent>
        </Select>
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
                    <Link href={`/dashboard/biodata-management/${record?.id}/biodata-edit-step-one`} className="w-8 h-8 cursor-pointer bg-primaryColor text-white rounded-md flex items-center justify-center transition-colors">
                        <GrEdit size={17} />
                    </Link>
                    <Link href={`/dashboard/biodata-management/${record?.id}/biodata-preview/`} className="w-8 h-8 cursor-pointer bg-primaryColor/40 text-headerColor rounded-md flex items-center justify-center transition-colors">
                        <BsFileEarmarkPdf size={17} />
                    </Link>
                    <button 
                        onClick={() => handleDelete(record?.id)} 
                        disabled={deletingId === record?.id}
                        className="w-8 h-8 cursor-pointer bg-redColor text-white rounded-md flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {deletingId === record?.id ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <RiDeleteBin6Line size={17} />
                        )}
                    </button>
                    </div>
                );
            },
        },
    ];
     const deleteBiodataMutation = useMutation({
      mutationFn: (id: string) => UserService.deleteBiodata(id, token),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["biodataData"] });
        toast.success("Biodata deleted successfully.");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to delete biodata. Please try again.");
      }
    });
   const handleDelete = (id: string) => {
    setDeletingId(id);
    deleteBiodataMutation.mutate(id, {
        onSettled: () => {
            setDeletingId(null);
        }
    });
   };
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
                            onClick={handle_export_pdf}
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
