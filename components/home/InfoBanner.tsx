
const InfoBanner = () => {
    const items = [
        "Boarding House available, Reserve today",
        "No Placement Fees for Maids! Register to transfer to new employer",
        "4 Months instalment payment option available for Employer",
    ];
    const smItem = [
        "Boarding House available, Reserve today",
        "No Placement Fees for Maids!",
        "4 Months instalment payment ",
    ];

    return (
        <div className="w-full py-3 md:py-5 overflow-x-auto" style={{ backgroundImage: "url('/home/topbg.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
            <div className="xl:flex gap-4 justify-center hidden  px-4 min-w-max mx-auto">
                {items.map((text, idx) => (
                    <div
                        key={idx}
                        className="bg-secondaryColor px-5 py-3 rounded-xl shadow-sm text-sm md:text-base font-medium text-headerColor whitespace-nowrap"
                    >
                        {text}
                    </div>
                ))}
            </div>
            <div className="flex xl:hidden gap-4 justify-center px-4 min-w-max mx-auto">
                {smItem.map((text, idx) => (
                    <div
                        key={idx}
                        className="bg-secondaryColor px-5 py-3 rounded-xl shadow-sm text-sm md:text-base font-medium text-headerColor whitespace-nowrap"
                    >
                        {text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoBanner;
