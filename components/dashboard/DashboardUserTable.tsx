"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToken } from "@/hooks/useToken";
import { Fetch } from "@/lib/Fetch";
import { UserService } from "@/service/user/user.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { GrEdit } from "react-icons/gr";
import TransferMaidForm from "../allForm/RegistrationForm";
import RequestForMaidForm from "../allForm/RequestForMaidForm";
import DynamicTableTwo from "../common/DynamicTableTwo";
import ButtonReuseable from "../reusable/CustomButton";
function DashboardUserTable({ recentOrder }: any) {
  const [recentOrders, setRecentOrders] = useState<any>(recentOrder);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedEditRecord, setSelectedEditRecord] = useState<any>(null);
  const [isEdite, setIsEdite] = useState(false)
  const [loadingStatusId, setLoadingStatusId] = useState<string | null>(null);
  const { token } = useToken();
  const router = useRouter();
  const queryClient = useQueryClient();
  
  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedType, selectedStatus]);

  // Build query parameters
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (debouncedSearchTerm.trim()) {
      params.append('search', debouncedSearchTerm.trim());
    }
    if (selectedType !== "all") {
      params.append('type', selectedType);
    }
    if (selectedStatus !== "all") {
      params.append('status', selectedStatus);
    }
    params.append('page', currentPage.toString());
    params.append('limit', itemsPerPage.toString());

    return params.toString();
  };

  const getEnquiriesData = async () => {
    const queryString = buildQueryParams();
    const response = await UserService.getEnquiriesData(queryString, token);
    return response?.data?.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["enquiriesData", debouncedSearchTerm, selectedType, selectedStatus, currentPage, itemsPerPage],
    queryFn: getEnquiriesData,
    enabled: !!token, // Only run query when token is available
  });

  // Handle status change
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
        `/admin/change-enquiry-status/${record?.id}`,
        { status: new_status },
        header
      );
      
      if (response?.data?.success) {
        // Refetch the data
        queryClient.invalidateQueries({ queryKey: ["enquiriesData"] });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoadingStatusId(null);
    }
  };

  // Handle PDF export
  const handle_export_pdf = () => {
    if (!data?.enquiries || data.enquiries.length === 0) {
      alert("No enquiry data to export");
      return;
    }

    const doc = new jsPDF();
    
    // Add header with title and date
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Enquiries Report", 14, 20);
    
    // Add subtitle with filter info
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const filter_type = selectedType === "all" ? "All Types" : selectedType.charAt(0).toUpperCase() + selectedType.slice(1);
    const filter_status = selectedStatus === "all" ? "All Status" : selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1);
    doc.text(`Filter Type: ${filter_type}`, 14, 30);
    doc.text(`Filter Status: ${filter_status}`, 14, 36);
    doc.text(`Generated on: ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`, 14, 42);
    doc.text(`Total Records: ${data.enquiries.length}`, 14, 48);
    
    // Add a line separator
    doc.setLineWidth(0.5);
    doc.line(14, 54, 196, 54);

    // Prepare table columns
    const tableColumn = [
      "Name",
      "Type",
      "Contact",
      "Date",
      "Time",
      "Source",
      "Status"
    ];

    // Prepare table rows with better data formatting
    const tableRows = data.enquiries.map((item: any) => [
      item.full_name || "-",
      item.enquiry_type || "-",
      item.mobile_number || "-",
      item.createdAt ? dayjs(item.createdAt).format("DD/MM/YYYY") : "-",
      item.time ? dayjs(item.time).format("hh:mm A") : "-",
      item.additional_information || "-",
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
        1: { halign: 'center', cellWidth: 20 }, // Type
        2: { cellWidth: 25 }, // Contact
        3: { halign: 'center', cellWidth: 25 }, // Date
        4: { halign: 'center', cellWidth: 20 }, // Time
        5: { cellWidth: 30 }, // Source
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
    const filename = `enquiries_${selectedType}_${timestamp}.pdf`;
    
    doc.save(filename);
  };

  const columns = [
    {
      label: "Name",
      accessor:  "full_name",
      width: "200px",
      formatter: (value: string, record: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">
              {record?.image_name ? <Image src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/uploads/${record?.image_name}`} alt="Uploaded Preview" width={100} height={100} className=" w-8 h-8 rounded-full object-cover" /> : value?.split(' ')?.map(n => n[0])?.join('')}
            </span>
          </div>
          <span className="text-sm font-medium">{value}</span>
        </div>
      ),
    },
    {
      label: "Type",
      accessor: "enquiry_type",
      width: "100px",
      formatter: (value: string) => (
        <span className="text-sm">{value}</span>
      ),
    },
    {
      label: "Contact",
      accessor:"mobile_number" ,
      width: "150px",
      formatter: (value: string) => (
        <span className="text-sm">{value}</span>
      ),
    },
    {
      label: "Date",
      accessor: "createdAt",
      width: "120px",
      formatter: (value: string) => (
        <span className="text-sm">{dayjs(value).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      label: "Time",
      accessor: "time",
      width: "100px",
      formatter: (value: string) => (
        <span className="text-sm">{dayjs(value).format("hh:mm A")}</span>
      ),
    },
    {
      label: "Source",
      accessor: "additional_information",
      width: "120px",
      formatter: (value: string) => (
        <span className="text-sm">{value}</span>
      ),
    },
    {
      label: "Status",
      accessor: "status",
      width: "140px",
      formatter: (value: string, record: any) => (
        <div className="change-arrow">
          <Select 
            value={value || "uncontacted"} 
            onValueChange={(new_status) => handle_status_change(new_status, record)}
            disabled={loadingStatusId === record?._id}
          >
            <SelectTrigger className={`w-full change-arrow h-10 text-xs !justify-center focus-visible:ring-ring/50 focus-visible:ring-0 font-semibold rounded-md border-0 ${
              value === "contacted"
                ? "bg-greenColor/15 text-greenColor"
                : value === "pending"
                ? "bg-yellow-500/15 text-yellow-500"
                : "bg-redColor/15 text-redColor"
            }`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem className={"bg-redColor/15 text-redColor !mb-1"} value="uncontacted">Uncontacted</SelectItem>
              <SelectItem className={"bg-greenColor/15 text-greenColor !mb-1"} value="contacted">Contacted</SelectItem>
              <SelectItem className={"bg-yellow-500/15 text-yellow-500"} value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      label: "Action",
      accessor: "action",
      width: "80px",
      formatter: (type: any, record: any) => {
        return (
          <button onClick={() => handleEdit(record)} className="w-8 h-8 cursor-pointer bg-primaryColor text-white rounded-md flex items-center justify-center  transition-colors">
            <GrEdit size={17} />
          </button>
        );
      },
    },
  ];

  const handleEdit = (record: any) => {
   setIsEdite(true)
   setSelectedEditRecord(record)
  }
  return (
    <section>
      <div className="bg-white shadow p-5 rounded-md">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-2xl font-bold text-gray-800">
              All Enquiries
            </h4>
            <Link href="/dashboard/add-enquiry">
              <ButtonReuseable title="Add Enquiry" icon={<FiPlus className="w-4 h-4" />} />
            </Link>
          </div>

          <div className=" md:flex items-center gap-4">
            <div className="flex-1 relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search enquiry"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-3  mt-4 md:mt-0">
              {/* Type Filter */}
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[140px] !h-12 bg-white border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                  <SelectValue placeholder="All Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Type</SelectItem>
                  <SelectItem value="maid">Maid</SelectItem>
                  <SelectItem value="employer">Employer</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[140px] !h-12 bg-white border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="uncontacted">Uncontacted</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              {/* Export Button */}
              <button onClick={handle_export_pdf} className="bg-[#C5EFF1] hover:bg-teal-200 text-teal-700 px-6 py-3 cursor-pointer rounded-lg transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>
        <DynamicTableTwo
          columns={columns}
          data={data?.enquiries || []}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1); // Reset to page 1 when items per page changes
          }}
          loading={isLoading}
          totalItems={data?.pagination?.totalCount || 0}
          totalpage={data?.pagination?.totalPages || 0}
        />
      </div>

      {isEdite && selectedEditRecord?.type == "Maid" ? <TransferMaidForm open={isEdite} setOpen={setIsEdite} record={selectedEditRecord} /> : <RequestForMaidForm open={isEdite} setOpen={setIsEdite} record={selectedEditRecord} />}
    </section>
  );
}

export default DashboardUserTable;
