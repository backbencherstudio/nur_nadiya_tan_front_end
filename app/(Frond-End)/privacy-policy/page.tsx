'use client';

import CommonHero from '@/components/reusable/CommonHero';
import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

type PolicyItem = {
  text: string | React.ReactNode;
};

type PolicySection = {
  title: string;
  subTitle?: React.ReactNode;
  items?: PolicyItem[];
  description?: string | React.ReactNode;
};

const lastUpdated = 'April 20, 2025';

const sections: PolicySection[] = [
  {
    title: '2. PERSONAL DATA WE COLLECT ',
    subTitle: 'We may collect Personal Data including: ',
  },
  {
    title: '2.1 Information You Provide',

    items: [
      {
        text: 'Name ',
      },
      {
        text: 'Email address ',
      },
      { text: 'Contact number ' },
      { text: 'Any information submitted via forms or enquiries ' },
    ],
  },
  {
    title: '2.2 Automatically Collected Data ',
    items: [
      { text: 'IP address ' },
      { text: 'Browser type and device information ' },
      { text: 'Pages visited and site interaction data' },
      { text: 'Cookies and analytics data ' },
    ],
  },
  {
    title: '3. PURPOSE OF COLLECTION ',
    subTitle: 'Your Personal Data may be used for:  ',
    items: [
      { text: 'Responding to enquiries or requests ' },
      { text: 'Providing information or services ' },
      { text: 'Improving website functionality and user experience  ' },
      { text: 'Internal record-keeping and administrative purposes ' },
      { text: 'Legal or regulatory compliance ' },
    ],
  },
  {
    title: '4. DISCLOSURE OF PERSONAL DATA ',
    subTitle: (
      <>
        <p>
          We do <span className="font-semibold">not sell or trade</span>{' '}
          Personal Data.{' '}
        </p>
        <p className="mt-1.5">Data may be disclosed only to: </p>
      </>
    ),
    items: [
      {
        text: 'Service providers supporting website or IT operations ',
      },
      {
        text: 'Regulatory or government authorities where legally required ',
      },
    ],
    description: 'All disclosures are limited to what is necessary.',
  },
  {
    title: '5. CONSENT',
    subTitle: 'By submitting your Personal Data, you consent to: ',
    items: [
      {
        text: 'Collection, use, and disclosure for stated purposes',
      },
      {
        text: 'Communication via email, phone, or messaging platforms where applicable ',
      },
    ],
    description: 'You may withdraw consent at any time (see Section 9).',
  },
  {
    title: '6. DATA PROTECTION ',
    items: [
      {
        text: 'Unauthorised access ',
      },
      {
        text: 'Loss or misuse ',
      },
      {
        text: 'Unauthorised disclosure  ',
      },
    ],
    description: (
      <>
        We take reasonable measures to safeguard Personal Data against
        unauthorised access, loss, misuse, and disclosure. However, no online
        system is completely secure.
      </>
    ),
  },
  {
    title: '7. DATA RETENTION ',
    subTitle: (
      <>
        <p>
          Personal Data is retained only for as long as necessary to fulfil the
          stated purposes or comply with legal requirements
        </p>
        <p className="">
          {' '}
          When no longer required, data will be securely deleted or anonymised.
        </p>
      </>
    ),
  },
  {
    title: '8. COOKIES ',
    subTitle: (
      <>
        <p>The Site may use cookies for functionality and analytics. </p>
        <p className="">
          {' '}
          You may disable cookies via browser settings, though some features may
          not function properly.
        </p>
      </>
    ),
  },
  {
    title: '9. ACCESS, CORRECTION & WITHDRAWAL  ',
    subTitle: 'You may request to:  ',
    items: [
      {
        text: 'Access your Personal Data ',
      },
      {
        text: 'Correct inaccurate data  ',
      },
      {
        text: 'Withdraw consent  ',
      },
    ],
    description: (
      <>
        <p className="text-black font-medium">Please contact: </p>
        <div className=" flex items-center gap-2 mt-1.5">
          <Mail size={16} /> Email:{' '}
          <Link
            className="text-blue-600"
            href="mailto:admin@transfermaidsingapore.com "
          >
            admin@transfermaidsingapore.com
          </Link>
        </div>
        <div className=" flex items-center gap-2 mt-1.5">
          <Phone size={16} /> Contact:{' '}
          <Link className="text-blue-600" href="+65 87427269">
            +65 87427269
          </Link>
        </div>
        <p className="mt-1.5 text-black">Verification may be required. </p>
      </>
    ),
  },
  {
    title: '10. THIRD-PARTY SITES ',
    subTitle: (
      <>
        <p>
          We are not responsible for privacy practices of external sites linked
          on this Site. Please review their privacy policies separately.{' '}
        </p>
      </>
    ),
  },
  {
    title: '11. POLICY UPDATES ',
    subTitle: (
      <>
        <p>This Privacy Policy may be updated from time to time.</p>
        <p>
          Continued use of the Site constitutes acceptance of the latest
          version.
        </p>
      </>
    ),
  },
];

function PrivacyPolicyPage() {
  return (
    <section className="">
      <CommonHero pageName="Privacy Policy" />
      <div className="container">
        <div className="max-w-5xl mx-auto  my-10 md:my-14 lg:my-24 rounded-2xl border border-borderColor">
          {/* Header */}
          <div className="px-8 bg-primaryColor rounded-t-2xl py-4">
            <h1 className="text-xl text-whiteColor md:text-2xl lg:text-3xl font-semibold">
              PRIVACY POLICY{' '}
            </h1>
            <p className="text-base text-whiteColor mt-1">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Body */}
          <div className="p-8 space-y-6">
            <div>
              <h2 className="text-lg md:text-xl lg:text-2xl mb-3 font-semibold text-headerColor  ">
                1. INTRODUCTION{' '}
              </h2>
              <p className="text-base text-black/80">
                This Privacy Policy explains how{' '}
                <span className="text-black/80 font-semibold">
                  Jo-An Recruitment & Consultancy Services
                </span>
              </p>
              <p className="text-base text-black/80">
                (<span className="italic">UEN 52811603K</span> |{' '}
                <span className="italic">License No. 95C8957</span>). collects,
                uses, discloses, and protects Personal Data in compliance with
                the{' '}
                <span className="text-black/80 font-semibold">
                  Singapore Personal Data Protection Act 2012 (PDPA).
                </span>
              </p>
              <div className="mt-2">
                <p className="text-base text-black/80">
                  By using this Site, you consent to the practices described
                  below.
                </p>
              </div>
            </div>
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-headerColor   ">
                  {section?.title}
                </h2>
                <h5 className="text-base  ">{section?.subTitle}</h5>
                {section?.items && (
                  <ul className="space-y-3 pl-5">
                    {section?.items.length > 0 &&
                      section?.items.map((it, i) => (
                        <li
                          key={i}
                          className="flex  items-start gap-3 text-base text-grayColor1"
                        >
                          <div className="w-4 h-4 flex-shrink-0 bg-grayColor1 rounded-full mt-1 flex items-center justify-center text-white">
                            <FaCheck size={10} />
                          </div>
                          <span>{it?.text}</span>
                        </li>
                      ))}
                  </ul>
                )}
                {section?.description && (
                  <p className="text-base text-black/80 mb-2">
                    {section?.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicyPage;
