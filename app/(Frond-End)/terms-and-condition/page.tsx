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
    title: "Definitions",
    items: [
      { text: "\"Helper\" / \"Maid\": Foreign domestic worker seeking transfer or employment." },
      { text: "\"Employer\": Individual/household seeking to hire a helper." },
      { text: "\"Agency\": MOM-licensed employment agency receiving referrals." },
      { text: "\"User\": Any person submitting or using the Website." }
    ]
  },
  {
    title: "Our Role",
    items: [
      { text: "We are not a licensed employment agency" },
      { text: "We act only as a lead generation and referral service, connecting users to MOM-licensed agencies." },
      { text: "Agencies take responsibility for the placement and MOM compliance." }
    ]
  },
  {
    title: "User Responsibilities",
    items: [
      { text: "Provide true, accurate, and complete information." },
      { text: "Acknowledge that all employment arrangements are handled by the Agency, not us." },
      { text: "Agree to comply with MOM rules when engaging helpers/employers." }
    ]
  },
  {
    title: "Data Protection",
    items: [
      { text: "We comply with PDPA." },
      { text: "Personal data will only be used for referral and placement purposes." }
    ]
  },
  {
    title: "Disclaimer & Limitation of Liability",
    items: [
      { text: "We make no guarantee on placement success, suitability, or accuracy of information." },
      { text: "We are not responsible for disputes, losses, or damages arising between Users and Agencies." },
      { text: "To the fullest extent permitted by law, our liability is excluded." }
    ]
  },
  {
    title: "Third-Party Links & Agencies",
    items: [
      { text: "We may link to third-party sites and agencies." },
      { text: "We are not liable for external content, actions, or services provided by agencies." }
    ]
  },
  {
    title: "Termination",
    items: [
      { text: "We reserve the right to remove, suspend, or deny access if users breach these T&Cs." }
    ]
  },
  {
    title: "Governing Law & Jurisdiction",
    items: [
      { text: "These T&Cs are governed by Singapore law." },
      { text: "Any disputes shall be subject to the exclusive jurisdiction of the Singapore courts." }
    ]
  },
  {
    title: "Amendments",
    items: [
      { text: "We may update these T&Cs at any time. Continued use of the Website constitutes acceptance of the updated terms." }
    ]
  },
  {
    title: "Contact Us",
    items: [
      { text: "For matters relating to these T&Cs, contact:" }
    ]
  }
];

function TermsAndConditionPage() {
  return (
    <section className="">
      <CommonHero pageName="Terms & Conditions " />
    <div className="container">
      <div className="max-w-5xl mx-auto  my-10 md:my-14 lg:my-24 rounded-2xl border border-borderColor">
        {/* Header */}
        <div className="px-8 bg-primaryColor rounded-t-2xl py-4">
          <h1 className="text-xl text-whiteColor md:text-2xl lg:text-3xl font-semibold" >Terms & Conditions </h1>
          <p className="text-base text-whiteColor mt-1" >Last Updated: {lastUpdated}</p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          <p className="text-base text-grayColor1" >These T&Cs govern the use of services provided through </p>

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
  );
}

export default TermsAndConditionPage
