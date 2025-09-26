"use client";

import CommonHero from "@/components/reusable/CommonHero";
import { FaCheck } from "react-icons/fa";

type PolicyItem = {
  text: string;
};

type PolicySection = {
  title: string;
  items: PolicyItem[];
};

const lastUpdated = "April 20, 2025";


const sections: PolicySection[] = [
  {
    title: "Acceptance of Terms",
    items: [
      { text: "By using the Website, you agree to these Terms." }
    ]
  },
  {
    title: "Our Role",
    items: [
      { text: "We are not a licensed employment agency." },
      { text: "We act only as a lead generation and referral service, connecting users to MOM-licensed agencies." }
    ]
  },
  {
    title: "User Obligations",
    items: [
      { text: "Provide accurate and truthful information." },
      { text: "Do not misuse the Website for unlawful or fraudulent purposes." },
      { text: "Consent to the sharing of your information with licensed agencies for placement purposes." }
    ]
  },
  {
    title: "Intellectual Property",
    items: [
      { text: "All website content belongs to [Your Brand Name]." },
      { text: "No copying or reproduction without written consent." }
    ]
  },
  {
    title: "Limitation of Liability",
    items: [
      { text: "We do not guarantee successful placements or outcomes." },
      { text: "We are not responsible for disputes or contracts between users and agencies." },
      { text: "Use of the Website is at your own risk." }
    ]
  },
  {
    title: "Termination",
    items: [
      { text: "We may suspend or terminate access if users breach these Terms." }
    ]
  },
  {
    title: "Governing Law",
    items: [
      { text: "These Terms are governed by the laws of Singapore." }
    ]
  },
  {
    title: "Contact Us",
    items: [
      { text: "For queries, contact" }
    ]
  }
];
function TermsOfUsePage() {
  return (
    <section className="">
        <CommonHero pageName="Terms of Use" />
         <div className="container">
      <div className="max-w-5xl mx-auto  my-10 md:my-14 lg:my-24 rounded-2xl border border-borderColor">
        {/* Header */}
        <div className="px-8 bg-primaryColor rounded-t-2xl py-4">
          <h1 className="text-xl text-whiteColor md:text-2xl lg:text-3xl font-semibold" >Terms of Use</h1>
          <p className="text-base text-whiteColor mt-1" >Last Updated: {lastUpdated}</p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          <p className="text-base text-grayColor1" >By accessing and using www.transfermaidsingapore.com(“the Website”), you agree to comply with these Terms of Use. If you do not agree, please discontinue use.</p>

          {sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-headerColor  " >{section.title}</h2>
              <ul className="space-y-3">
                {section.items.map((it, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-grayColor1" >
                   <span className="w-4 h-4 bg-grayColor1 rounded-full mt-1 flex items-center justify-center text-white" ><FaCheck size={10} /></span>
                    <span>{it.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
  )
}

export default TermsOfUsePage
