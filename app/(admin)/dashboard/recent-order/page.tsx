"use client";
import DynamicTableTwo from "@/components/common/DynamicTableTwo";
import Loader from "@/components/reusable/Loader";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function RecentOrderPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [recentOrders, setRecentOrders] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [error, setError] = useState<string | null>(null); // For error handling
  const { token } = useToken();
  const [acceptLoadingId, setAcceptLoadingId] = useState<string | null>(null);
  const [rejectLoadingId, setRejectLoadingId] = useState<string | null>(null);
  const itemsPerPage = 10;
  const fetchData = async () => {
    if (!token) {
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await UserService.getDashBoardData(token);
      setRecentOrders(response?.data?.recentOrders || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [token]);

  const addBoooking = async (id: string) => {
    setAcceptLoadingId(id);
    const action = { action: "accept" };
  
    try {
      const response = await UserService.acceptBooking(action, token, id);
      if (response?.data?.status === true) {
        toast.success("Booking accepted successfully");
        fetchData();
      }
    } catch (error) {
      console.error("Accept error:", error);
    } finally {
      setAcceptLoadingId(null);
    }
  };
  
  const rejectBoooking = async (id: string) => {
    setRejectLoadingId(id);
    const action = { action: "reject" };
  
    try {
      const response = await UserService.rejectBooking(action, token, id);
      if (response?.data?.status === true) {
        toast.success("Booking rejected successfully");
        fetchData();
      }
    } catch (error) {
      console.error("Reject error:", error);
    } finally {
      setRejectLoadingId(null);
    }
  };
  
const columns = [
    {
      label: "No",
      accessor: "no",
      width: "50px",
      formatter: (_: any, _row: any, index: number) => {
        // const serial = (currentPage - 1) * 7 + index + 1;
        const serial = index + 1;
        return <span className="text-sm font-medium">{serial}</span>;
      },
    },
    // {
    //   label: "Order Id",
    //   accessor: "id",
    //   width: "100px",
    //   formatter: (value: string) => (
    //     <div className="break-words w-[100px] text-sm leading-tight">{value}</div>
    //   ),
    // },
    {
      label: "User Name",
      accessor: "userName",
      width: "172px",
      formatter: (item) => {
        return <p className="capitalize">{item}</p>;
      },
    },
    {
      label: "Service Name",
      accessor: "serviceName",
      width: "172px",
    },
    {
      label: "Service Type",
      accessor: "serviceType",
      width: "172px",
    },
    {
      label: "Location",
      accessor: "location",
      width: "252px",
    },
    {
      label: "Service Date",
      accessor: "serviceDate",
      width: "120px",
      formatter: (value) => {
        const formattedDate = dayjs(value).format("YYYY-MM-DD");
        return <div>{formattedDate}</div>;
      },
    },
    {
      label: "Action",
      accessor: "action",
      width: "120px",
      formatter: (_: any, record: any) => {
        return (
          <span className="flex gap-2">
            <button
              onClick={() => addBoooking(record?.orderId)}
              disabled={acceptLoadingId === record?.orderId}
              className="text-base border border-primaryColor rounded-md px-5 py-2 text-primaryColor cursor-pointer disabled:cursor-not-allowed disabled:bg-pragaraphColor disabled:text-whiteColor disabled:border-0"
            >
              {acceptLoadingId === record?.orderId ? "Sending..." : "Accept"}
            </button>
            <button
              onClick={() => rejectBoooking(record?.orderId)}
              disabled={rejectLoadingId === record?.orderId}
              className="text-base bg-primaryColor rounded-md px-5 py-2 text-whiteColor cursor-pointer disabled:cursor-not-allowed disabled:bg-pragaraphColor"
            >
              {rejectLoadingId === record?.orderId ? "Sending..." : "Reject"}
            </button>
          </span>
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
        </div>

        {/* Loading spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <Loader />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-6 text-red-500">
            {error}
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="flex justify-center py-6 text-sm text-gray-500">
            No recent orders found.
          </div>
        ) : (
          <DynamicTableTwo
            columns={columns}
            data={recentOrders}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </section>
  );
}

export default RecentOrderPage;
