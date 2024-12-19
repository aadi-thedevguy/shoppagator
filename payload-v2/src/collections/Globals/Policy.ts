import { GlobalConfig } from "payload/types";

export const Policy: GlobalConfig = {
  slug: "policy",
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  fields: [
    {
      name: "privacy_policy",
      label: "Privacy Policy",
      type: "richText",
      defaultValue: [
        { type: "h4", children: [{ text: "Last updated: January 16, 2024" }] },
        {
          children: [
            {
              text: "This Privacy Policy includes important information about your personal data and we encourage you to read it carefully.",
            },
          ],
        },
        { type: "h2", children: [{ text: "Welcome", bold: true }] },
        {
          children: [
            {
              text: "This Privacy Policy (“Policy”) describes the Personal Data we collect, how we use and share it, along with details on how you can reach out to us with privacy-related inquiries. Additionally, the Policy outlines your rights as a data subject and choices you have, including the right to object to certain usages of your Personal Data by us. ",
            },
          ],
        },
        {
          children: [
            {
              text: "In this Policy, “Shopagator”, “we”, “our,” or “us” refers to the Shopaggator entity responsible for the collection, use, and handling of Personal Data as described in this document. ",
            },
          ],
        },
        {
          children: [
            {
              text: "“Personal Data” refers to any information associated with an identified or identifiable individual, which can include data that you provide to us, and we collect about you during your interaction with our Services (such as device information, IP address, etc.).",
            },
          ],
        },
        {
          children: [
            {
              text: "“Services” refer to the products and services provided by our Services Agreement and our Consumer Terms of Service. This may include devices and applications developed or being run by ",
            },
            { text: "Our Name.", bold: true },
          ],
        },
        {
          children: [
            {
              text: "Depending on the context, “you” might be an End User or Visitor:",
            },
          ],
        },
        {
          children: [
            {
              children: [
                {
                  text: "When you use an End User Service for personal use, such as shopping from our website, we refer to you as an “End User.”",
                },
              ],
              type: "li",
            },
            {
              type: "li",
              children: [
                {
                  text: "When you interact with us by visiting our Site without being logged into a Stripe account, or when your interaction with us does not involve you being an End User, you are considered a “Visitor.”",
                },
              ],
            },
          ],
          type: "ol",
        },
        { children: [{ text: "" }], type: "ol" },
        {
          type: "h2",
          children: [
            {
              text: "1. Personal Data we collect and how we use and share it",
              bold: true,
            },
          ],
        },
        {
          children: [
            {
              text: "Our collection and use of Personal Data differs based on whether you are an End User or a Visitor, and the specific Service being utilized. ",
            },
          ],
        },
        {
          type: "h3",
          children: [
            {
              text: "1.1 Personal Data we collect about End Users",
              bold: true,
            },
          ],
        },
        {
          children: [
            { text: "Paying Stripe:", bold: true },
            {
              text: " When you purchase goods or services directly from us, we share your Transaction Data with stripe. For instance, when you make a payment to our Store, we collect information about the transaction, as well as your contact and payment method details.",
            },
          ],
        },
        {
          children: [
            { text: "Identity/Verification Services: ", bold: true },
            {
              text: "We also collect your basic user information like name, email address etc. to identify and track your orders etc.",
            },
          ],
        },
        { type: "h3", children: [{ text: "1.2 Visitors", bold: true }] },
        {
          children: [
            {
              text: "We collect, use, and share the Personal Data of Visitors. More details about how we collect, use, and share Visitors' Personal Data can be found in our ",
            },
            {
              children: [{ text: "Privacy Center." }],
              linkType: "custom",
              type: "link",
              url: `${
                process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
              }/privacy-policy`,
            },
            { text: "" },
          ],
        },
        {
          type: "h4",
          children: [
            { text: "a. Personal Data we collect about Visitors", bold: true },
          ],
        },
        {
          children: [
            { text: "Engagement:", bold: true },
            {
              text: " As you interact with our Sites, we use the information we collect about and through your devices to provide opportunities for further interactions, such as discussions about Services or interactions with chatbots, to address your questions.",
            },
          ],
        },
        {
          children: [
            {
              text: "When you browse our Sites, we receive your Personal Data, either provided directly by you or collected through our use of cookies and similar technologies. See our ",
            },
            {
              newTab: false,
              type: "link",
              url: `${
                process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
              }/cookie`,
              children: [{ text: "Cookie Policy" }],
            },
            {
              text: " for more information. If you opt to complete a form on the Site or third party websites where our advertisements are displayed (like Twitter or Instagram), we collect the information you included in the form. This may include your contact information and other information pertaining to your questions about our Services. We may also associate a location with your visit.",
            },
            { text: "" },
          ],
        },
        {
          type: "h2",
          children: [
            {
              text: "2. More ways we collect, use, and share Personal Data",
              bold: true,
            },
          ],
        },
        {
          children: [
            {
              text: "In addition to the ways described above, we also process your Personal Data as follows:",
            },
          ],
        },
        {
          type: "h3",
          children: [{ text: "a. Collection of Personal Data", bold: true }],
        },
        {
          children: [
            { text: "Online Activity", bold: true },
            {
              text: ". Depending on the Service used we may collect information related to:",
            },
          ],
        },
        {
          type: "ol",
          children: [
            {
              type: "li",
              children: [
                {
                  text: "The devices and browsers you use across our Sites and third party websites, apps, and other online services (“Third Party Sites”).",
                },
              ],
            },
            {
              type: "li",
              children: [
                {
                  text: "Usage data associated with those devices and browsers and your engagement with our Services, including data elements like IP address, plug-ins, language preference, time spent on Sites and Third Party Sites, pages visited, links clicked, payment methods used, and the pages that led you to our Sites and Third Party Sites. We also collect activity indicators, such as mouse activity indicators, to help us detect fraud.",
                },
              ],
            },
          ],
        },
        {
          children: [
            { text: "Communication and Engagement Information:", bold: true },
            {
              text: " We also collect information you choose to share with us through various channels, such as support tickets, emails, or social media. If you respond to emails or surveys from us, we collect your email address, name, and any other data you opt to include in your email or responses.",
            },
          ],
        },
        {
          type: "h3",
          children: [{ text: "b. Use of Personal Data. ", bold: true }],
        },
        {
          children: [
            {
              text: "Besides the use of Personal Data described above, we use Personal Data in the ways listed below:",
            },
          ],
        },
        {
          children: [
            { text: "Improving and Developing our Services:", bold: true },
            {
              text: " We use analytics on our Sites to help us understand your use of our Sites and Services and diagnose technical issues. Please review our ",
            },
            {
              newTab: false,
              type: "link",
              url: `${
                process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
              }/cookie`,
              children: [{ text: "Cookie Policy" }],
            },
            {
              text: " to learn more about how you can control our use of cookies and third party analytics. We also collect and process Personal Data throughout our various Services, whether you are an End User or a Visitor, to improve our Services, develop new Services, and support our efforts to make our Services more relevant and useful to you.",
            },
            { text: "" },
          ],
        },
        {
          children: [
            { text: "Communications:", bold: true },
            {
              text: " We use the contact information we have about you to deliver our Services, which may involve sending codes via Email for your authentication. ",
            },
            {
              text: " If you are an End User or Visitor, we may communicate with you using the contact information we have about you to provide information about our Services , invite you to participate in our events, surveys, or user research, or otherwise communicate with you for marketing purposes, in compliance with applicable law, including any consent or opt-out requirements. For example, when you provide your contact information to us or when we collect your business contact details through participation at trade shows or other events, we may use this data to follow up with you regarding an event, provide information requested about our Services, and include you in our marketing information campaigns.",
            },
          ],
        },
        {
          children: [
            { text: "Fraud Prevention and Security:", bold: true },
            {
              text: " We collect and use Personal Data to help us identify and manage activities that could be fraudulent or harmful across our Services, enable our fraud detection Business Services, and secure our Services and transactions against unauthorized access, use, alteration or misappropriation of Personal Data, information, and funds. As part of the fraud prevention, detection, security monitoring, and compliance efforts for Stripe and its Business Users, we collect information from third parties (such as credit bureaus) and via the Services we offer.",
            },
          ],
        },
        {
          children: [
            { text: "Compliance with Legal Obligations:", bold: true },
            {
              text: ' We use Personal Data to meet our contractual and legal obligations related to anti-money laundering, Know-Your-Customer ("KYC") laws, anti-terrorism activities, safeguarding vulnerable customers, export control, and prohibition of doing business with restricted persons or in certain business fields, among other legal obligations. For example, we may monitor transaction patterns and other online signals and use those insights to identify fraud, money laundering, and other harmful activity that could affect our services. Ensuring safety, security, and compliance for our Services is a key priority for us, and collecting and utilizing Personal Data is crucial to this effort.',
            },
          ],
        },
        {
          children: [
            { text: "Minors:", bold: true },
            {
              text: " Our Services are not directed to children under the age of 13, and we request that they do not provide Personal Data to seek Services directly from us. In certain countries, we may impose higher age limits as required by applicable law.",
            },
          ],
        },
        {
          type: "h3",
          children: [{ text: "c. Sharing of Personal Data. ", bold: true }],
        },
        {
          children: [
            {
              text: "As of now, aside from your sharing your transaction details with stripe to effectively receive payments, we ",
            },
            { text: "DO NOT", bold: true },
            {
              text: " share your personal data anywhere through any means or channels.",
            },
          ],
        },
        {
          type: "h2",
          children: [{ text: "3. Your rights and choices", bold: true }],
        },
        {
          children: [
            {
              text: "Depending on your location and subject to applicable law, you may have choices regarding our collection, use, and disclosure of your Personal Data:",
            },
          ],
        },
        {
          type: "h3",
          children: [
            {
              text: "a. Opting out of receiving electronic communications from us",
              bold: true,
            },
          ],
        },
        {
          children: [
            {
              text: "If you wish to stop receiving marketing-related emails from us, you can opt-out by clicking the unsubscribe link included in such emails or dropping a mail to our ",
            },
            { text: "Support Team.", bold: true },
            {
              text: " We'll try to process your request(s) as quickly as reasonably practicable. However, it's important to note that even if you opt out of receiving marketing-related emails from us, we retain the right to communicate with you about the Services you receive (like support and important legal notices).",
            },
          ],
        },
        {
          type: "h3",
          children: [{ text: "b. Your data protection rights", bold: true }],
        },
        {
          children: [
            {
              text: "Depending on your location and subject to applicable law, you may have the following rights regarding the Personal Data we control about you:",
            },
          ],
        },
        {
          type: "ol",
          children: [
            {
              type: "li",
              children: [
                {
                  text: "The right to request confirmation of whether We are processing Personal Data associated with you, and if so, request access to that Personal Data",
                },
              ],
            },
            {
              type: "li",
              children: [
                {
                  text: "The right to request that we rectify or update your Personal Data if it's inaccurate, incomplete, or outdated;",
                },
              ],
            },
            {
              type: "li",
              children: [
                {
                  text: "The right to request that we erase your Personal Data in certain circumstances as provided by law;",
                },
              ],
            },
            {
              type: "li",
              children: [
                {
                  text: "The right to request that we export the Personal Data we hold about you to another company, provided it's technically feasible;",
                },
              ],
            },
            {
              type: "li",
              children: [
                {
                  text: "The right to withdraw your consent if your Personal Data is being processed based on your previous consent;",
                },
              ],
            },
            {
              type: "li",
              children: [
                {
                  text: "The right to object to the processing of your Personal Data if we are processing your data based on our legitimate interests; unless there are compelling legitimate grounds or the processing is necessary for legal reasons, we will cease processing your Personal Data upon receiving your objection.",
                },
              ],
            },
          ],
        },
        {
          type: "h2",
          children: [{ text: "4. Security and Retention", bold: true }],
        },
        {
          children: [
            {
              text: "We make reasonable efforts to provide a level of security appropriate to the risk associated with the processing of your Personal Data. We maintain organizational, technical, and administrative measures designed to protect the Personal Data covered by this Policy from unauthorized access, destruction, loss, alteration, or misuse. Unfortunately, no data transmission or storage system can be guaranteed to be 100% secure.  ",
            },
          ],
        },
        {
          children: [
            {
              text: "We encourage you to assist us in protecting your Personal Data. If you hold an account, you can do so by using a strong password, safeguarding your password against unauthorized use, and avoiding using identical login credentials you use for other services or accounts for your personal account. If you suspect that your interaction with us is no longer secure (for instance, you believe that your account's security has been compromised), please ",
            },
            {
              newTab: false,
              type: "link",
              url: "mailto:support@thedevguy.in",
              children: [{ text: "contact us" }],
              linkType: "custom",
            },
            { text: " immediately." },
          ],
        },
        {
          children: [
            {
              text: "We retain your Personal Data for as long as we continue to provide the Services to you, or for a period in which we reasonably foresee continuing to provide the Services. Even after we stop providing Services directly to you, and even after you close your account, we may continue to retain your Personal Data to:",
            },
          ],
        },
        {
          type: "ol",
          children: [
            {
              type: "li",
              children: [
                { text: "Comply with our legal and regulatory obligations;" },
              ],
            },
            {
              type: "li",
              children: [
                {
                  text: "Enable fraud monitoring, detection, and prevention activities; and",
                },
              ],
            },
            {
              type: "li",
              children: [
                {
                  text: "Comply with our tax, accounting, and financial reporting obligations, including when such retention is required by our contractual agreements with our Financial Partners (and where data retention is mandated by the payment methods you've used).",
                },
              ],
            },
          ],
        },
        {
          children: [
            {
              text: "In cases where we keep your Personal Data, we do so in accordance with any limitation periods and record retention obligations imposed by applicable law. ",
            },
          ],
        },
        {
          type: "h2",
          children: [{ text: "5. Updates and notifications", bold: true }],
        },
        {
          children: [
            {
              text: "We may change this Policy from time to time to reflect new services, changes in our privacy practices or relevant laws. The “Last updated” legend at the top of this Policy indicates when this Policy was last revised. Any changes are effective the latter of when we post the revised Policy on the Services or otherwise provide notice of the update as required by law.",
            },
          ],
        },
        {
          children: [
            {
              text: "We may provide you with disclosures and alerts regarding the Policy or Personal Data collected by posting them on our website and, if you are an End User or Representative, by contacting you through your email address.",
            },
          ],
        },
        { type: "h2", children: [{ text: "6. Contact us", bold: true }] },
        {
          children: [
            {
              text: "If you have any questions or complaints about this Policy, please contact us at support@thedevguy.in If you are an End Customer (i.e., an individual doing business or transacting with a Business User), please refer to the privacy policy or notice of the Business User for information regarding the Business User’s privacy practices, choices and controls, or contact the Business User directly.",
            },
          ],
        },
      ],
    },
    {
      name: "terms_of_service",
      label: "Terms of Service",
      type: "richText",
      defaultValue: [
        { children: [{ text: "Last updated: July 31, 2023" }], type: "h4" },
        {
          type: "h3",
          children: [{ text: "1. Introduction and Scope", bold: true }],
        },
        {
          children: [
            { text: "These Consumer Terms of Service (“" },
            { text: "Terms of Service", bold: true },
            { text: "” or “" },
            { text: "Terms", bold: true },
            { text: "”) are a legal agreement between us ( “" },
            { text: "us", bold: true },
            { text: "”, “" },
            { text: "our", bold: true },
            { text: "”, “" },
            { text: "we", bold: true },
            { text: "”, or “" },
            { text: "Shoppagator", bold: true },
            {
              text: "”) and you, the individual who uses one or more of the products and services we offer for your personal use under these Terms (referred to as “",
            },
            { text: "you", bold: true },
            { text: "” or “" },
            { text: "your", bold: true },
            {
              text: "”). The following Terms are a legally binding agreement between you and us, and it describes the terms and conditions applicable to your use of our Consumer Services. By using our Consumer Services, you agree to be bound by these Terms, and any new features or tools that are added will also be subject to these Terms. ",
            },
          ],
        },
        {
          children: [
            {
              text: "These general Terms apply to all of our Consumer Services that reference these Terms. ",
            },
          ],
        },
        {
          type: "h3",
          children: [
            { text: "2. Additional Terms That Apply to You", bold: true },
          ],
        },
        {
          children: [
            {
              text: "The following additional policies and terms also apply when you access or use the Consumer Services, all of which are incorporated by reference into these Terms:",
            },
          ],
        },
        { children: [{ text: "" }] },
        {
          type: "ol",
          children: [
            {
              type: "li",
              children: [
                { text: "Privacy Policy. You acknowledge the " },
                {
                  newTab: false,
                  type: "link",
                  url: `${
                    process.env.NEXT_PUBLIC_SERVER_URL ||
                    "http://localhost:3000"
                  }/privacy-policy`,
                  children: [{ text: "Privacy Policy." }],
                },
                {
                  text: " Stripe and the Business User are independent controllers of personal data collected in conjunction with the Consumer Services and will independently and separately determine the purposes and means of its processing of personal data.  We may transfer your personal data to countries other than your own country. Please read the Privacy Policy carefully to understand how your information is collected, used, and shared in connection with these Consumer Services.",
                },
              ],
            },
            {
              type: "li",
              children: [
                {
                  text: "Product-Specific Terms. A Consumer Service may have specific terms that apply when you use that particular Consumer Service.",
                },
              ],
            },
          ],
        },
        {
          children: [
            {
              text: "We may revise these Terms from time to time. We will use reasonable efforts to notify you of material changes to these Terms in advance of their effectiveness, including by posting notice on the applicable Consumer Services or providing notice via an email address associated with you. The revised Terms will be effective on the date stated in the revised Terms. By using a Consumer Service after any revisions become effective, you agree to those changes. If you do not agree with any changes to these Terms, you must stop using the Consumer Services.",
            },
          ],
        },
        { type: "h3", children: [{ text: "3. Eligibility", bold: true }] },
        {
          children: [
            {
              text: "You may only enter into these Terms if you are over the age of majority and able to enter into a legally binding contract in the country in which you reside. ",
            },
          ],
        },
        {
          children: [
            {
              text: "You must not use the Consumer Services if you have previously been terminated or suspended from using any of our services, including any Consumer Service. You may not enter into the Terms or use any Consumer Service if you are the target of government sanctions.",
            },
          ],
        },
        {
          children: [
            {
              text: "You must be eligible for the particular Consumer Services to the extent they are available in your country. If we present an incorrect country for you or you move countries, then you must correct the country in your account or contact support ",
            },
            {
              newTab: false,
              type: "link",
              url: `${
                process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
              }/contact-us`,

              children: [{ text: "" }],
            },
            { text: "before using the Consumer Services again." },
          ],
        },
        { children: [{ text: "" }] },
        {
          type: "h3",
          children: [
            { text: "4. Identification and Prevention of Fraud", bold: true },
          ],
        },
        { children: [{ text: "You agree that:" }] },
        {
          type: "ol",
          children: [
            {
              type: "li",
              children: [
                {
                  text: "Information you provide about yourself and your use of the Consumer Services must be complete and accurate as of the time provided, and you must keep this information up-to-date;",
                },
              ],
            },
            {
              type: "li",
              children: [
                {
                  text: "To the extent law allows, we and our service providers may verify your identity. ",
                },
              ],
            },
            {
              type: "li",
              children: [
                {
                  text: "You must notify us immediately if you become aware of any unauthorized use or access to your account. You are responsible for any actions taken through the use of your credentials, except for actions taken after you have told us that your account or credentials have been compromised.",
                },
              ],
            },
          ],
        },
        { children: [{ text: "" }] },
        {
          type: "h3",
          children: [
            {
              text: "5. Communications via Text, Push Notification, Email, and Phone",
              bold: true,
            },
          ],
        },
        {
          children: [
            {
              text: "To the extent allowable under law, by providing us with an email or phone number, you consent to receiving text (SMS) messages and emails from us. Such communications may include, but are not limited to, requests for secondary authentication, receipts, reminders, notifications regarding updates to your account or account support, requests for product feedback, and marketing or promotional communications. You acknowledge that you are not required to consent to receive promotional texts or emails as a condition of using any Consumer Service. ",
            },
          ],
        },
        {
          children: [
            {
              text: "You may opt-out of receiving promotional email communications we send to you by following the unsubscribe options on such emails. You may opt-out of text messages from us by contacting Support. You acknowledge that opting out of receiving communications may impact your use of Consumer Services.",
            },
          ],
        },
        { children: [{ text: "" }] },
        {
          type: "h3",
          children: [
            { text: "6. Our Intellectual Property Rights", bold: true },
          ],
        },
        {
          children: [
            {
              text: "We reserve all rights not expressly granted to you in these Terms. The Consumer Services are protected by trademark, copyright, patent and other laws of the United States and other countries. We own all rights, title, interest in and to the Consumer Services and all copies of the Consumer Services, and all Intellectual Property Rights in them. Your use of the Consumer Services is subject to these Terms, and these Terms do not grant you any rights to our Intellectual Property Rights or the Intellectual Property Rights of our licensors, licensees, or partners.",
            },
          ],
        },
        {
          children: [
            { text: "For the purposes of these Terms, “" },
            { text: "Intellectual Property Rights", bold: true },
            {
              text: "” means all patent rights, copyright rights, mask work rights, moral rights, rights of publicity, trademark, trade dress and service mark rights, goodwill, trade secret rights, and other intellectual property rights that may exist now or come into existence in the future, and all of their applications, registrations, renewals and extensions, under the laws of any state, country, territory or other jurisdiction.",
            },
          ],
        },
        { children: [{ text: "" }] },
        { type: "h3", children: [{ text: "7. Feedback", bold: true }] },
        {
          children: [
            {
              text: "You may choose to submit feedback, ideas and suggestions about the Consumer Services, but it is never required. You may provide us with feedback on the Consumer Services though email. You agree that we may use and share all feedback, ideas, and suggestions you submit for any purpose and without compensation or obligation to you. ",
            },
          ],
        },
        { children: [{ text: "" }] },
        { type: "h3", children: [{ text: "8. Termination", bold: true }] },
        {
          children: [
            { text: "Termination by Us:", bold: true },
            {
              text: " We may terminate these Terms, and we may limit, suspend, change, or remove your access to any or all Consumer Services, including any feature or aspect of the Consumer Services, at any time for any reason. If commercially reasonable, we will take reasonable steps to notify you before taking any action that restricts your access to the Consumer Services. If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we may terminate these Terms of Service at any time without notice to you and accordingly we may terminate your access to the Consumer Services. ",
            },
          ],
        },
        {
          children: [
            { text: "Termination by You:", bold: true },
            {
              text: " Subject to any product-specific Terms below, you may terminate any Consumer Service at any time and for any reason by terminating the Consumer Service or closing or deleting your account. Termination will be effective on the date that your account is closed.",
            },
          ],
        },
        {
          children: [
            { text: "Effect of Termination. ", bold: true },
            {
              text: "Upon termination, you will not have any further use of or access to the Consumer Services. Subject to applicable law, you will also not have any use of or access to any information you submitted through the Consumer Services, and all rights granted under these Terms will end. Termination does not relieve you of your obligations to pay amounts owed to us or our Business partners. Termination does not revoke any third-party payment authorizations.",
            },
          ],
        },
        { children: [{ text: "" }] },
        {
          type: "h3",
          children: [{ text: "9. Disclaimer of Warranties", bold: true }],
        },
        {
          children: [
            {
              text: "The Consumer Services are provided “as-is” and without any representation or warranty, whether express or implied. We make no representation or warranty of any kind whatsoever (other than those implied by statute) with respect to the Consumer Services or the content, materials, information and functions we make accessible, and specifically disclaim all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement. We do not promise that the Consumer Services will be uninterrupted, error-free, or secure.",
            },
          ],
        },
        {
          children: [
            {
              text: "The Disclaiming Entities do not control or make any warranties regarding the products or services others provide in connection with the Consumer Services. In other words, we do not have control over the businesses from which you’re purchasing when using the Consumer Services, and we do not promise or imply that the products or services you buy using the Consumer Services will work as promised or be safe to use.",
            },
          ],
        },
        {
          children: [
            {
              text: "Some laws limit or prohibit disclaiming the warranties referred to in the previous paragraphs, or impose obligations on us that we can’t eliminate with these Terms. In those cases, this section (Disclaimer of Warranties) does not restrict, exclude or modify any consumer rights under any applicable law.",
            },
          ],
        },
        {
          type: "h3",
          children: [{ text: "10. Limitation of Liability", bold: true }],
        },
        {
          children: [
            {
              text: "The Disclaiming Entities will not be liable to you for any failure to perform our obligation under these Terms due to a Force Majeure Event. A “",
            },
            { text: "Force Majeure Event", bold: true },
            {
              text: "” is any event beyond the control of us, including a strike or other labor dispute; labor shortage, stoppage or slowdown; supply chain disruption; embargo or blockade; telecommunication breakdown; power outage or shortage; inadequate transportation service; inability or delay in obtaining adequate supplies; weather; earthquake; fire; flood; act of God; riot; civil disorder; civil or government calamity; epidemic; pandemic; state or national health crisis; war; invasion; hostility (whether war is declared or not); terrorism threat or act; Law; or act of a Governmental Authority.",
            },
          ],
        },
        {
          children: [
            {
              text: "The Disclaiming Entities will not be liable to you for any failure to perform our obligations under these Terms where performance of that obligation would have put us in violation of applicable law.",
            },
          ],
        },
        {
          children: [
            {
              text: "The Disclaiming Entities will not be liable to you in any circumstances for:",
            },
          ],
        },
        {
          type: "ol",
          children: [
            {
              type: "li",
              children: [
                {
                  text: "Loss of business, loss of goodwill, loss of opportunity, or loss of profit; or",
                },
              ],
            },
            {
              type: "li",
              children: [
                {
                  text: "Any loss that we could not have reasonably anticipated.",
                },
              ],
            },
          ],
        },
        { children: [{ text: "" }] },
        {
          children: [
            {
              text: "You and we agree that the other has relied on the disclaimer of warranties and limitation of liability stated above in entering into these Terms, the limitation and disclaimer are essential to the agreement between you and us under these Terms, and they will apply to the fullest extent allowed by law.",
            },
          ],
        },
        {
          children: [
            {
              text: "Some laws restrict our ability to disclaim or limit our liability. In those cases, this section does not restrict, exclude or modify any consumer rights under any applicable law.",
            },
          ],
        },
        {
          type: "h3",
          children: [
            {
              text: "11. Assignment and Third-Party Beneficiaries",
              bold: true,
            },
          ],
        },
        {
          children: [
            {
              text: "You must not assign your rights or obligations under these Terms to anyone without our prior written consent. We may delegate performing our obligations, and we may assign our rights and obligations under these Terms to Stripe affiliates, at any time for any reason by providing notice to you. ",
            },
          ],
        },
        { children: [{ text: "" }] },
        { type: "h3", children: [{ text: "12. Contact", bold: true }] },
        {
          children: [
            {
              text: "If you have a question about the Consumer Services or how these Terms apply to you, please contact support.",
            },
            {
              newTab: false,
              type: "link",
              url: `${
                process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
              }/contact-us`,

              children: [{ text: "" }],
            },
            { text: "" },
          ],
        },
      ],
    },
    {
      name: "cookie_policy",
      label: "Cookie Policy",
      type: "richText",
      defaultValue: [
        { children: [{ text: "" }] },
        { type: "h3", children: [{ text: "Last updated: January 16, 2024" }] },
        {
          children: [
            { text: "This cookie policy describes how " },
            { text: '"We"', bold: true },
            {
              text: " uses “cookies” and other similar technologies, in connection with our Site and Services. Any capitalized term used and not otherwise defined below has the meaning assigned to it in the Privacy Policy.",
            },
          ],
        },
        { children: [{ text: "" }] },
        { children: [{ text: "\n" }] },
        { type: "h2", children: [{ text: "1. What is a Cookie?" }] },
        {
          children: [
            {
              text: "Cookies are small text files that are stored in a computer's browser directory. They help site providers with things like understanding how people use a site, remembering a User's login details, and storing site preferences. Stripe uses cookies as well as similar technologies (e.g., URL tracking, local storage). For the purpose of this Cookie Policy, such technologies are included in the term ‘cookies’.",
            },
          ],
        },
        { children: [{ text: "" }] },
        { type: "h2", children: [{ text: "2. Do We use Cookies?" }] },
        {
          children: [
            {
              text: "Yes. We use cookies in accordance with our Privacy Policy to:",
            },
          ],
        },
        {
          type: "ol",
          children: [
            {
              type: "li",
              children: [
                { text: "ensure that our Services function properly," },
              ],
            },
            {
              type: "li",
              children: [
                {
                  text: "detect and prevent fraud and violations of our terms of service,",
                },
              ],
            },
            {
              type: "li",
              children: [
                {
                  text: "understand how visitors use and engage with our Site,",
                },
              ],
            },
            {
              type: "li",
              children: [
                {
                  text: "advertise our products and services, where allowed and",
                },
              ],
            },
            {
              type: "li",
              children: [
                {
                  text: "analyze and improve our Services and your Site experience.",
                },
              ],
            },
            { children: [{ text: "" }] },
            { type: "h2", children: [{ text: "3. How We Use Cookies" }] },
            {
              children: [
                {
                  text: "Cookies play an important role in helping us provide effective and safe Services. Below is a description of the commonly used cookie types and the purposes that apply to them. ",
                },
              ],
            },
            { type: "h2", children: [{ text: "Necessary Cookies" }] },
            {
              children: [
                {
                  text: "Some cookies are essential to the operation of our Site and Services and make it usable and secure by enabling basic functions like page navigation and access to secure areas of the Site. We use those cookies in a number of different ways, including:",
                },
              ],
            },
            {
              type: "ol",
              children: [
                {
                  type: "li",
                  children: [
                    { text: "Authentication", bold: true },
                    {
                      text: ". To remember your login state so you don't have to log in as you navigate through our Site and dashboard.",
                    },
                  ],
                },
                {
                  type: "li",
                  children: [
                    { text: "Fraud Prevention and Detection", bold: true },
                    {
                      text: ". Cookies and similar technologies that we deploy through our Site help us learn things about computers and web browsers used to access the Services. This information helps us monitor for and detect potentially harmful or illegal use of our Services. For example, in order to process payments transactions for our Users, it is necessary for us to collect information about the transaction and the Customer. To help secure these transactions and minimize fraud, we collect additional information through the use of cookies and other technologies in helping to identify bad actors and prevent them from making fraudulent transactions.",
                    },
                  ],
                },
                {
                  type: "li",
                  children: [
                    { text: "Security", bold: true },
                    {
                      text: ". To protect user data from unauthorized access.",
                    },
                  ],
                },
                {
                  type: "li",
                  children: [
                    { text: "Functionality", bold: true },
                    {
                      text: ". To keep our Site and Services working correctly, like showing you the right information for your selected location.\n",
                    },
                  ],
                },
              ],
            },
            { type: "h2", children: [{ text: "Analytics Cookies" }] },
            {
              children: [
                {
                  text: "Analytics cookies help us understand how visitors interact with our Services. We use those cookies in a number of different ways, including:",
                },
              ],
            },
            {
              type: "ul",
              children: [
                {
                  type: "li",
                  children: [
                    { text: "Site Features and Services", bold: true },
                    {
                      text: ". To remember how you prefer to use our Services so that you don't have to reconfigure your settings each time you log into your account.\n",
                    },
                  ],
                },
                {
                  type: "li",
                  children: [
                    { text: "To Analyze and Improve Our Services", bold: true },
                    {
                      text: ". To make our Site and Services work better for You. Cookies help us understand how people reach our Site and our Users' sites. They give us insights into improvements or enhancements we need to make to our Site and Services.\n",
                    },
                  ],
                },
                {
                  type: "li",
                  children: [
                    { text: "Third Party Analytics", bold: true },
                    {
                      text: ". Through Google Analytics in order to collect and analyze information about the use of the Services and report on activities and trends. This service may also collect information regarding the use of other sites, apps and online resources. You can learn about Google's practices on the ",
                    },
                    {
                      newTab: false,
                      type: "link",
                      url: "https://policies.google.com/technologies/partner-sites",
                      children: [{ text: "Google website" }],
                    },
                    { text: "." },
                  ],
                },
              ],
            },
            { children: [{ text: "" }] },
            { type: "h2", children: [{ text: "5. Can I opt-out?" }] },
            {
              children: [
                {
                  text: "Yes. You can opt out of cookies through our Cookie Settings Dashboard, with the exception of those cookies that are necessary to provide you with our Services. For Stripe-affiliated websites, you can learn more about cookies by visiting those sites directly. Your web browser may allow you to manage your cookie preferences, including to delete and disable Stripe cookies. You can take a look at the help section of your web browser or follow the links below to understand your options. If you choose to disable cookies, some features of our Site or Services may not operate as intended.",
                },
              ],
            },
          ],
        },
        {
          children: [
            {
              children: [
                { text: "Chrome: " },
                {
                  newTab: false,
                  type: "link",
                  url: "https://support.google.com/chrome/answer/95647?hl=en",
                  children: [
                    {
                      text: "https://support.google.com/chrome/answer/95647?hl=en",
                    },
                  ],
                },
                { text: "\n" },
              ],
              type: "li",
            },
            {
              children: [
                { text: "Explorer: " },
                {
                  newTab: false,
                  type: "link",
                  url: "https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies",
                  children: [
                    {
                      text: "https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies",
                    },
                  ],
                },
                { text: "\n" },
              ],
              type: "li",
            },
            {
              children: [
                { text: "Safari: " },
                {
                  newTab: false,
                  type: "link",
                  url: "https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac",
                  children: [
                    {
                      text: "https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac",
                    },
                  ],
                },
                { text: "\n" },
              ],
              type: "li",
            },
            {
              children: [
                { text: "Firefox: " },
                {
                  newTab: false,
                  type: "link",
                  url: "https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer",
                  children: [
                    {
                      text: "https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer",
                    },
                  ],
                },
                { text: "\n" },
              ],
              type: "li",
            },
            {
              children: [
                { text: "Opera: " },
                {
                  newTab: false,
                  type: "link",
                  url: "https://help.opera.com/en/latest/web-preferences/#cookies",
                  children: [
                    {
                      text: "https://help.opera.com/en/latest/web-preferences/#cookies",
                    },
                  ],
                },
                { text: "" },
              ],
              type: "li",
            },
          ],
          type: "ul",
        },
        { children: [{ text: "\n\n" }] },
        { children: [{ text: "\n\n" }] },
      ],
    },
  ],
};
