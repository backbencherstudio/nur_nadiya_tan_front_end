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
    title: "Information We Collect",
    items: [
      { text: "Maids / Helpers: name, nationality, contact details, work experience, employment preferences." },
      { text: "Employers: name, contact details, household requirements, preferences for helper." },
      { text: "Assist with your insurance claims." }
    ]
  },
  {
    title: "Purpose of Collection",
    items: [
      { text: "Connect maids/helpers with potential employers through licensed employment agencies." },
      { text: "Share your details with MOM-licensed employment agencies for placement purposes." },
      { text: "Respond to your enquiries and manage your application" },
      { text: "Improve our services and website experience." }
    ]
  },
  {
    title: "Consent",
    items: [
      { text: "The collection and use of your data for the stated purposes." },
      { text: "Disclosure of your data to partner MOM-licensed agencies." },
      { text: "Assist with your insurance claims." }
    ]
  },
  {
    title: "Data Disclosure",
    items: [
      { text: "MOM-licensed employment agencies." },
      { text: "Service providers (e.g. hosting, IT support)." }
    ]
  },
  {
    title: "Data Protection & Retention",
    items: [
      { text: "Data is stored securely with safeguards against unauthorized access" },
      { text: "We retain data only as long as necessary, after which it will be deleted securely." }
    ]
  },
  {
    title: "Access & Correction",
    items: [
      { text: "You may request access to your personal data or correction of any inaccuracies by contacting us at." }
    ]
  },
  {
    title: "Disclaimer",
    items: [
      { text: "We are not a licensed employment agency. We act solely as a referral platform that connects users with MOM-licensed agencies." }
    ]
  },
  {
    title: "Contact Us",
    items: [
      { text: "or privacy-related questions, contact our Data Protection Officer" }
    ]
  }
];

function PrivacyPolicyPage() {
  return (
    <section className="">
      <CommonHero pageName="Privacy Policy" />
    <div className="container">
      <div className="max-w-5xl mx-auto  my-10 md:my-14 lg:my-24 rounded-2xl border border-borderColor">
        {/* Header */}
        <div className="px-8 bg-primaryColor rounded-t-2xl py-4">
          <h1 className="text-xl text-whiteColor md:text-2xl lg:text-3xl font-semibold" >Privacy Policy</h1>
          <p className="text-base text-whiteColor mt-1" >Last Updated: {lastUpdated}</p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          <p className="text-base text-grayColor1" >(“we”, “our”, “us”) respects your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal data in compliance with Singapore’s <span className="text-base text-black font-medium">Personal Data Protection Act (PDPA).</span></p>

          {sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-headerColor  " >{section.title}</h2>
              <ul className="space-y-3">
                {section.items.map((it, i) => (
                  <li key={i} className="flex items-start gap-3" >
                    <span className="w-4 h-4 bg-grayColor1 rounded-full mt-1 flex items-center justify-center text-white" ><FaCheck size={10} /></span>
                    <span className="text-base text-grayColor1" >{it.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
}

export default PrivacyPolicyPage
