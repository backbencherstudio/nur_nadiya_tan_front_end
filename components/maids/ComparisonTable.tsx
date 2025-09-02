import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

function ComparisonTable() {
  const comparisonData = [
    {
      id: "01",
      feature: "Interview in Person",
      transferMaid: { status: true, text: "Yes" },
      newMaid: { status: false, text: "No" },
    },
    {
      id: "02",
      feature: "Ready to Start Soon",
      transferMaid: { status: true, text: "1-2 Weeks" },
      newMaid: { status: false, text: "1-2 Months" },
    },
    {
      id: "03",
      feature: "Already in Singapore",
      transferMaid: { status: true, text: "" },
      newMaid: { status: false, text: "No" },
    },
    {
      id: "04",
      feature: "Experience with SG Lite",
      transferMaid: { status: true, text: "" },
      newMaid: { status: false, text: "No" },
    },
    {
      id: "05",
      feature: "More Cost-Effective",
      transferMaid: { status: true, text: "Lesser Upfront fees" },
      newMaid: { status: false, text: "More Upfront Fees" },
    },
  ];

  return (
    <div className="">
      <section className="container">

        <div className="mt-12 border rounded-[10px] overflow-x-auto">
          <table className="min-w-[750px] w-full border  rounded-xl overflow-hidden bg-white shadow-lg table-fixed">
            <colgroup>
              <col className="w-1/3" />
              <col className="w-1/3" />
              <col className="w-1/3" />
            </colgroup>
            <thead>
              <tr className="bg-[#FEFEC6]">
                <th className="md:py-4 py-3 px-3 md:px-6 text-base md:text-lg font-semibold text-headerColor text-left  border-b border-[#F6F6D9]">Feature</th>
                <th className="md:py-4 py-3 px-3 md:px-6 text-base md:text-lg font-semibold text-headerColor text-left  border-b border-l border-[#F6F6D9]">Transfer Maid</th>
                <th className="md:py-4 py-3 px-3 md:px-6 text-base md:text-lg font-semibold text-headerColor text-left border-b border-l border-[#F6F6D9]">New maid From Overseas</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr
                  key={row.id}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFB]'} ${index === comparisonData.length - 1 ? 'last:rounded-b-xl' : ''}`}
                >
                  <td className="md:py-4 py-2 px-3 md:px-6 text-base font-medium text-headerColor align-middle border-b border-[#F6F6D9] w-1/3 text-left">{row.feature}</td>
                  <td className="py-4 px-6 align-middle border-b border-l border-[#F6F6D9] w-1/3 text-left">
                    <div className="flex items-center gap-2 justify-start w-full">
                      {row.transferMaid.status ? (
                        <FaCheckCircle className="text-green-500 w-4 h-4" />
                      ) : (
                        <MdOutlineCancel className="text-red-500 w-4 h-4" />
                      )}
                      {row.transferMaid.text && (
                        <span className="text-base text-descriptionColor">{row.transferMaid.text}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 align-middle border-b border-l border-[#F6F6D9] w-1/3 text-left">
                    <div className="flex items-center gap-2 justify-start w-full">
                      {row.newMaid.status ? (
                        <FaCheckCircle className="text-green-500 w-4 h-4" />
                      ) : (
                        <MdOutlineCancel className="text-red-500 w-4 h-4" />
                      )}
                      {row.newMaid.text && (
                        <span className="text-base text-descriptionColor">{row.newMaid.text}</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default ComparisonTable; 