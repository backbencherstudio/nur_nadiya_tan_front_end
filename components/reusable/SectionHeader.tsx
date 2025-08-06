
function SectionHeader({title, description}) {
  return (
    <div>
       <div className="text-center mb-16">
          <h2 className="text-2xl  lg:text-[32px] xl:text-5xl leading-[120%] text-blackColor font-semibold mb-3">
           {title}
          </h2>
          <p className="text-base text-descriptionColor max-w-3xl mx-auto">
           {description}
          </p>
        </div>
    </div>
  )
}

export default SectionHeader
