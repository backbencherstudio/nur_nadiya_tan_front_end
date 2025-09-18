"use client";
import Link from "next/link";
import { useState } from "react";
import DynamicTableTwo from "../common/DynamicTableTwo";

function RecentOrderTable({ recentOrder }: any) {
  const [recentOrders, setRecentOrders] = useState<any>(recentOrder);
  const [currentPage, setCurrentPage] = useState(1);

  // Demo data matching the table structure from the image
  const demoData = [
    {
      id: 1,
      name: "Courtney Henry",
      type: "Maid",
      contact: "(603) 555-0123",
      date: "1 Jan 2025",
      time: "09:30 AM",
      source: "WhatsApp",
      status: "Contacted"
    },
    {
      id: 2,
      name: "Wade Warren",
      type: "Employer",
      contact: "(603) 555-0124",
      date: "1 Jan 2025",
      time: "09:30 AM",
      source: "Website",
      status: "Contacted"
    },
    {
      id: 3,
      name: "Dianne Russell",
      type: "Maid",
      contact: "(603) 555-0125",
      date: "1 Jan 2025",
      time: "09:30 AM",
      source: "WhatsApp",
      status: "Uncontacted"
    },
    {
      id: 4,
      name: "Guy Hawkins",
      type: "Employer",
      contact: "(603) 555-0126",
      date: "1 Jan 2025",
      time: "09:30 AM",
      source: "Website",
      status: "Contacted"
    },
    {
      id: 5,
      name: "Arlene McCoy",
      type: "Maid",
      contact: "(603) 555-0127",
      date: "1 Jan 2025",
      time: "09:30 AM",
      source: "WhatsApp",
      status: "Contacted"
    },
    {
      id: 6,
      name: "Savannah Nguyen",
      type: "Employer",
      contact: "(603) 555-0128",
      date: "1 Jan 2025",
      time: "09:30 AM",
      source: "Website",
      status: "Uncontacted"
    },
    {
      id: 7,
      name: "Savannah Nguyen",
      type: "Maid",
      contact: "(603) 555-0129",
      date: "1 Jan 2025",
      time: "09:30 AM",
      source: "WhatsApp",
      status: "Contacted"
    },
    {
      id: 8,
      name: "Savannah Nguyen",
      type: "Employer",
      contact: "(603) 555-0130",
      date: "1 Jan 2025",
      time: "09:30 AM",
      source: "Website",
      status: "Contacted"
    },
    {
      id: 9,
      name: "Savannah Nguyen",
      type: "Maid",
      contact: "(603) 555-0131",
      date: "1 Jan 2025",
      time: "09:30 AM",
      source: "WhatsApp",
      status: "Uncontacted"
    },
    {
      id: 10,
      name: "Savannah Nguyen",
      type: "Employer",
      contact: "(603) 555-0132",
      date: "1 Jan 2025",
      time: "09:30 AM",
      source: "Website",
      status: "Contacted"
    }
  ];

  const columns = [
    {
      label: "Name",
      accessor: "name",
      width: "200px",
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
      label: "Type",
      accessor: "type",
      width: "100px",
      formatter: (value: string) => (
        <span className="text-sm">{value}</span>
      ),
    },
    {
      label: "Contact",
      accessor: "contact",
      width: "150px",
      formatter: (value: string) => (
        <span className="text-sm">{value}</span>
      ),
    },
    {
      label: "Date",
      accessor: "date",
      width: "120px",
      formatter: (value: string) => (
        <span className="text-sm">{value}</span>
      ),
    },
    {
      label: "Time",
      accessor: "time",
      width: "100px",
      formatter: (value: string) => (
        <span className="text-sm">{value}</span>
      ),
    },
    {
      label: "Source",
      accessor: "source",
      width: "120px",
      formatter: (value: string) => (
        <span className="text-sm">{value}</span>
      ),
    },
    {
      label: "Status",
      accessor: "status",
      width: "120px",
      formatter: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          value === "Contacted" 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {value}
        </span>
      ),
    },
    {
      label: "Action",
      accessor: "action",
      width: "80px",
      formatter: (_: any, record: any) => {
        return (
          <button className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
        );
      },
    },
  ];
  return (
    <section>
      <div className="border p-5 rounded-md">
        <div className=" flex justify-between items-center pb-4">
          <h4 className="text-xl lg:text-2xl font-medium text-headerColor ">
            Our Recent Orders
          </h4>
          <div>
            <Link
              href="/dashboard/recent-order"
              className="cursor-pointer text-headerColor border rounded-md text-sm flex items-center gap-2 px-[14px] py-2"
            >
              {" "}
              View All
            </Link>
          </div>
        </div>
        <DynamicTableTwo
          columns={columns}
          data={demoData}
          currentPage={currentPage}
          itemsPerPage={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
}

export default RecentOrderTable;
