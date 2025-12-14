'use client';

import CommonHero from '@/components/reusable/CommonHero';
import { FaCheck } from 'react-icons/fa';

type PolicyItem = {
  text: string | React.ReactNode;
};

type PolicySection = {
  title: string;
  items: PolicyItem[];
};

const lastUpdated = 'April 20, 2025';
const siteUrl = 'https://nur-nadiya-tan-front-end.vercel.app/';
const sections: PolicySection[] = [
  {
    title: 'Definitions',
    number: '2.',
    items: [
      {
        text: (
          <>
            <span className="font-bold text-black">"Company" , </span>
            <span className="font-bold text-black">"we" , </span>
            <span className="font-bold text-black">"us", </span>
            <span className="font-bold text-black">"our"</span> refers to Jo-An
            Recruitment & Consultancy Services.
          </>
        ),
      },
      {
        text: (
          <>
            <span className="font-bold text-black">"Site" , </span> refers to{' '}
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {siteUrl}
            </a>{' '}
            and all related pages.
          </>
        ),
      },
      {
        text: (
          <>
            <span className="font-bold text-black">"User" , </span>
            <span className="font-bold text-black">"you" , </span>
            <span className="font-bold text-black">"your"</span> refers to any
            individual accessing or using the Site.
          </>
        ),
      },
      {
        text: (
          <>
            <span className="font-bold text-black">"Services"</span> refers to
            information, tools, forms, consultations, or services made available
            through the Site.
          </>
        ),
      },
    ],
  },
  {
    title: 'ELIGIBILITY',
    subTitle: 'You confirm that:',
    number: '3.',
    items: [
      {
        text: (
          <>
            You are at least{' '}
            <span className="font-bold text-black"> 21 years old</span> , or
          </>
        ),
      },
      {
        text: 'You are using the Site with consent and supervision of a parent or legal guardian. ',
      },
    ],
  },
  {
    title: 'USE OF THE SITE',
    number: '4.',
    subTitle: (
      <>
        'You agree that you will{' '}
        <span className="text-black font-bold">NOT:</span> '
      </>
    ),
    items: [
      {
        text: 'Use the Site for unlawful, misleading, or fraudulent purposes.',
      },
      {
        text: 'Interfere with the security or operation of the Site.',
      },
      {
        text: 'Upload or transmit malicious code, viruses, or harmful data.',
      },
      {
        text: 'Attempt unauthorised access to systems or data.',
      },
      {
        text: 'Misrepresent your identity or submit false information.',
      },
    ],
    description:
      'We reserve the right to restrict or terminate access if misuse is detected.',
  },

  {
    title: 'INFORMATION DISCLAIMER',
    number: '5.',
    subTitle: (
      <>
        <p>
          All information on the Site is provided for{' '}
          <span className="text-black font-bold">
            general informational purposes only.
          </span>{' '}
        </p>
        <p className=" mt-1">
          While we aim to keep information accurate and up to date:{' '}
        </p>
      </>
    ),

    items: [
      {
        text: (
          <>
            We make <span className="text-black font-bold">no guarantees</span>{' '}
            as to completeness or accuracy
          </>
        ),
      },
      {
        text: (
          <>
            Information does{' '}
            <span className="text-black font-bold">
              not constitute legal, employment, or professional advice
            </span>{' '}
            as to completeness or accuracy
          </>
        ),
      },
      {
        text: 'Users should verify information independently where required.',
      },
    ],
  },
  {
    title: 'THIRD-PARTY LINKS ',
    number: '6.',
    subTitle: (
      <>
        <p className="">
          The Site may contain links to third-party websites or tools.{' '}
        </p>
        <p>
          We are <span className="text-black font-bold">not responsible</span>{' '}
          for the content, accuracy, privacy practices, or availability of
          external sites.
        </p>
        <p className="mt-1">
          Access to third-party links is at your own risk.{' '}
        </p>
      </>
    ),
  },
  {
    title: 'INTELLECTUAL PROPERTY ',
    number: '7.',
    subTitle: (
      <>
        <p className="">
          All content on the Site (including text, layout, design, graphics,
          logos, and code) is owned by or licensed to us.{' '}
        </p>
        <p className="mt-1">
          You may <span className="text-black font-bold">not:</span>{' '}
        </p>
      </>
    ),
    items: [
      {
        text: 'Copy, reproduce, modify, distribute, or republish any content without prior written consent. ',
      },
    ],
  },
  {
    title: 'LIMITATION OF LIABILITY ',
    number: '8.',
    subTitle: (
      <>
        <p className="">To the maximum extent permitted by Singapore law: </p>
      </>
    ),
    items: [
      {
        text: 'We are not liable for any direct or indirect loss, damage, or disruption arising from use or inability to use the Site ',
      },
      {
        text: 'This includes loss of data, loss of profits, or system downtime ',
      },
    ],
    description: 'Use of the Site is entirely at your own risk.',
  },
  {
    title: '9. INDEMNITY ',

    subTitle: (
      <>
        <p className="">
          You agree to indemnify and hold harmless Jo-An Recruitment &
          Consultancy Services against any claims, damages, liabilities, or
          costs arising from:{' '}
        </p>
      </>
    ),
    items: [
      { text: 'Your misuse of the Site ' },
      {
        text: 'Breach of these Terms',
      },
      {
        text: 'Violation of any applicable laws or third-party rights',
      },
    ],
  },
  {
    title: '10. MODIFICATIONS',
    subTitle: (
      <>
        <p className="">
          We reserve the right to update or modify these Terms at any time.{' '}
        </p>
        <p>
          Updated Terms will be posted on the Site and take effect immediately.{' '}
        </p>
        <p className="mt-1">
          Continued use constitutes acceptance of the revised Terms.{' '}
        </p>
      </>
    ),
  },
  {
    title: '11. GOVERNING LAW ',

    subTitle: (
      <>
        <p className="mt-1">
          These Terms are governed by the{' '}
          <span className="text-black font-bold">laws of Singapore,</span> and
          you agree to submit to the exclusive jurisdiction of the Singapore
          courts.
        </p>
      </>
    ),
  },
];

function TermsAndConditionPage() {
  return (
    <section className="">
      <CommonHero pageName="Terms & Conditions " />
      <div className="container">
        <div className="max-w-5xl mx-auto  my-10 md:my-14 lg:my-24 rounded-2xl border border-borderColor">
          {/* Header */}
          <div className="px-8 bg-primaryColor rounded-t-2xl py-4">
            <h1 className="text-xl text-whiteColor md:text-2xl lg:text-3xl font-semibold">
              Terms & Conditions{' '}
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
              <p className="text-base text-grayColor1">
                This website (the “Site”) is owned and operated by{' '}
                <span className="text-black font-semibold">
                  Jo-An Recruitment & Consultancy Services
                </span>
              </p>
              <p className="text-base text-grayColor1">
                (<span className="italic">UEN 52811603K</span> |{' '}
                <span className="italic">License No. 95C8957</span>).
              </p>
              <div className="mt-2">
                <p className="text-base text-grayColor1">
                  By accessing, browsing, or using this Site, you agree to be
                  bound by these Terms & Conditions (“Terms”).
                </p>
                <p className="text-base text-grayColor1">
                  If you do not agree with any part of these Terms, please
                  discontinue use of the Site immediately.{' '}
                </p>
              </div>
            </div>

            {sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-headerColor   ">
                  {section?.number} {section?.title}
                </h2>
                <h5 className="text-base ">{section?.subTitle}</h5>
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

export default TermsAndConditionPage;
