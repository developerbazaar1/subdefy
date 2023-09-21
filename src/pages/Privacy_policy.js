import React from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import BackToTopButton from "../components/BackToTopButton.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle as farFaCircle } from "@fortawesome/free-regular-svg-icons";
const Privacy_policy = () => {
  return (
    <div>
      {/**************** Navbar component ******************/}
      <Navbar />

      <section className="privacy-policy m-auto text-center">
        <div className="privacy-policy-centar">
          <div className="container">
            <div className="heading-bold">
              <h2>Privacy Policy</h2>
            </div>
            <div className="box m-auto border-box">
              <div className="heading-bold">
                <h2 className="mt-2 pb-5">Privacy Policy</h2>
              </div>
              <div className="policy-content">
                <h6>Privacy Statement</h6>
                <p>
                  This Privacy Statement explains our practices, including your
                  choices, regarding the collection, use, and disclosure of
                  certain information, including your personal information in
                  connection with the Subdefy service
                </p>
                <h6>Contacting Us</h6>
                <p>
                  For questions specifically about this Privacy Statement, or
                  our use of your personal information, cookies or similar
                  technologies, please contact our Data Protection
                  Officer/Privacy Office by email at support@subdefy.com with
                  the subject line that includes ‘Privacy Statement’. Please
                  note that if you contact us to assist you, for your safety and
                  ours we may need to authenticate your identity before
                  fulfilling your request
                </p>
              </div>
              <div className="policy-content">
                <h6>Collection of Information</h6>
                <p>We receive and store information about you such as</p>
              </div>

              <div className="list">
                <div className="head-list">
                  <ul className="list-section">
                    <li className="list-parent">
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      Information you provide to us: We collect information you
                      provide to us which includes:
                    </li>
                    <li className="list-child">
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="px-1 li-child-icon"
                          icon={farFaCircle}
                        />
                      </span>
                      your name, email address, address or postal code, payment
                      method(s), and telephone number. We collect this
                      information in a number of ways, including when you enter
                      it while using our service, interact with our customer
                      service, or participate in surveys or marketing
                      promotions;
                    </li>
                    <li className="list-child">
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="px-1 li-child-icon"
                          icon={farFaCircle}
                        />
                      </span>
                      information when you choose to provide ratings, account
                      settings (including preferences set in the “Account”
                      section of our website), or otherwise provide information
                      to us through our service or elsewhere.
                    </li>

                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      Information we collect automatically: We collect
                      information about you and your use of our service, your
                      interactions with us and our advertising, as well as
                      information regarding your network, network devices, and
                      your computer or other Subdefy capable devices you might
                      use to access our service. This information includes:
                    </li>
                    <li className="list-child">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="px-1 li-child-icon"
                          icon={farFaCircle}
                        />
                      </span>
                      your activity on the Subdefy service
                    </li>
                    <li className="list-child">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="px-1 li-child-icon"
                          icon={farFaCircle}
                        />
                      </span>
                      your interactions with our emails and texts, and with our
                      messages through push and online messaging channels;
                    </li>
                    <li className="list-child">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="px-1 li-child-icon"
                          icon={farFaCircle}
                        />
                      </span>
                      details of your interactions with our customer service,
                      such as the date, time and reason for contacting us,
                      transcripts of any chat conversations, and if you call us,
                      your phone number and call recordings;
                    </li>
                    <li className="list-child">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="px-1 li-child-icon"
                          icon={farFaCircle}
                        />
                      </span>
                      device IDs or other unique identifiers, including for your
                      network devices, and devices that are Subdefy capable on
                      your Wi-Fi network;
                    </li>
                    <li className="list-child">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="px-1 li-child-icon"
                          icon={farFaCircle}
                        />
                      </span>
                      resettable device identifiers (also known as advertising
                      identifiers), such as those on mobile devices, tablets,
                      and streaming media devices that include such identifiers
                      (see the “Cookies and Internet Advertising” section below
                      for more information);
                    </li>
                    <li className="list-child">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="px-1 li-child-icon"
                          icon={farFaCircle}
                        />
                      </span>
                      device and software characteristics (such as type and
                      configuration), connection information including type
                      (wifi, cellular), statistics on page views, referring
                      source (for example, referral URLs), IP address (which may
                      tell us your general location), browser and standard web
                      server log information;
                    </li>
                    <li className="list-child">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="px-1 li-child-icon"
                          icon={farFaCircle}
                        />
                      </span>
                      information collected via the use of cookies, web beacons
                      and other technologies, including ad data (such as
                      information on the availability and delivery of ads, the
                      site URL, as well as the date and time). (See our “Cookies
                      and Internet Advertising” section for more details.)
                    </li>

                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      Information from other sources: We also obtain information
                      from other sources. We protect this information according
                      to the practices described in this Privacy Statement, plus
                      any additional restrictions imposed by the source of the
                      data. These sources vary over time, but could include:
                    </li>
                    <li className="list-child">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="px-1 li-child-icon"
                          icon={farFaCircle}
                        />
                      </span>
                      service providers that help us determine a location based
                      on your IP address in order to customize our service and
                      for other uses consistent with this Privacy Statement;
                    </li>
                    <li className="list-child">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="px-1 li-child-icon"
                          icon={farFaCircle}
                        />
                      </span>
                      security service providers who provide us with information
                      to secure our systems, prevent fraud and help us protect
                      the security of Subdefy accounts;
                    </li>
                    <li className="list-child">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="px-1 li-child-icon"
                          icon={farFaCircle}
                        />
                      </span>
                      payment service providers who provide us with payment or
                      balance information, or updates to that information, based
                      on their relationship with you;
                    </li>
                    <li className="list-child">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="px-1 li-child-icon"
                          icon={farFaCircle}
                        />
                      </span>
                      online and offline data providers, from which we obtain
                      aggregated demographic, interest based and online
                      advertising related data
                    </li>
                    <li className="list-child">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="px-1 li-child-icon"
                          icon={farFaCircle}
                        />
                      </span>
                      publicly-available sources such as publicly available
                      posts on social media platforms and information available
                      through public databases associating IP addresses with
                      internet service providers (ISPs).
                    </li>
                  </ul>
                </div>
              </div>
              <div className="policy-content mt-3">
                <h6>Use of Information</h6>
                <p>
                  We use information to provide, analyze, administer, enhance
                  and personalize our services and marketing efforts, to manage
                  member referrals, to process your registration, your orders
                  and your payments, and to communicate with you on these and
                  other topics. For example, we use such information to
                </p>
              </div>
              <div className="list">
                <div className="head-list">
                  <ul className="list-section">
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      determine your general geographic location, provide
                      localized services, provide you with customized and
                      personalized subscription recommendations like services we
                      think will be of interest to you, determine your ISP to
                      support network troubleshooting for you (we also use
                      aggregated ISP information for operational and business
                      purposes), and help us quickly and efficiently respond to
                      inquiries and requests;
                    </li>
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      secure our systems, prevent fraud and help us protect the
                      security of Subdefy accounts;
                    </li>
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      prevent, detect and investigate potentially prohibited or
                      illegal activities, including fraud, and to enforce our
                      terms
                    </li>
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      analyze and understand our audience, improve our service
                      (including our user interface experiences and service
                      performance) and optimize services selection,
                      recommendation algorithms and delivery;
                    </li>
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      communicate with you concerning our service so that we can
                      send you news about Subdefy, details about new features
                      and content available on Subdefy, special offers,
                      promotional announcements, consumer surveys, and to assist
                      you with operational requests such as password reset
                      requests. These communications may be by various methods,
                      such as email, push notifications, text message, online
                      messaging channels, and matched identifier communications
                      (described below). Please see the “Your Choices” section
                      of this Privacy Statement to learn how to set or change
                      your communications preferences.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="policy-content mt-3">
                <h6>Disclosure of Information</h6>
                <p>
                  We disclose your information for certain purposes and to third
                  parties, as described below:
                </p>
              </div>
              <div className="list">
                <div className="head-list">
                  <ul className="list-section">
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      Service Providers: We use other companies, agents or
                      contractors ("Service Providers") to perform services on
                      our behalf or to assist us with the provision of services
                      to you. For example, we engage Service Providers to
                      provide marketing, advertising, communications, security,
                      infrastructure and IT services, to customize, personalize
                      and optimize our service, to provide bank account or
                      balance information, to process credit card transactions
                      or other payment methods, to provide customer service, to
                      analyze and enhance data (including data about users'
                      interactions with our service), and to process and
                      administer consumer surveys. In the course of providing
                      such services, these Service Providers may have access to
                      your personal or other information. We do not authorize
                      them to use or disclose your personal information except
                      in connection with providing their services (which
                      includes maintaining and improving their services).
                    </li>
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      Partners: As described above, you may have a relationship
                      with one or more of our Partners, in which case we may
                      share certain information with them in order to coordinate
                      with them on providing the Subdefy service to members and
                      providing information about the availability of the
                      Subdefy service. For example, depending on what Partner
                      services you use, we may share information:
                    </li>
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      prevent, detect and investigate potentially prohibited or
                      illegal activities, including fraud, and to enforce our
                      terms
                    </li>
                    <li className="list-child">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="px-1 li-child-icon"
                          icon={farFaCircle}
                        />
                      </span>
                      in order to facilitate Partner pre-paid promotions or
                      collection of payment for the Subdefy service for
                      distribution to us;
                    </li>
                    <li className="list-child">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="px-1 li-child-icon"
                          icon={farFaCircle}
                        />
                      </span>
                      with Partners who operate voice assistant platforms that
                      allow you to interact with our service using voice
                      commands;
                    </li>
                    <li className="list-child">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="px-1 li-child-icon"
                          icon={farFaCircle}
                        />
                      </span>
                      so that content and features available in the Subdefy
                      service can be suggested to you in the Partner’s user
                      interface. For members, these suggestions are part of the
                      Subdefy service and may include customized and
                      personalized subscription recommendations.
                    </li>
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      Promotional offers: We may offer joint promotions or
                      programs that, in order for your participation, will
                      require us to share your information with third parties.
                      In fulfilling these types of promotions, we may share your
                      name and other information in connection with fulfilling
                      the incentive. Please note that these third parties are
                      responsible for their own privacy practices.
                    </li>
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      Protection of Subdefy and others: Subdefy and its Service
                      Providers may disclose and otherwise use your personal and
                      other information where we or they reasonably believe such
                      disclosure is needed to (a) satisfy any applicable law,
                      regulation, legal process, or governmental request, (b)
                      enforce applicable terms of use, including investigation
                      of potential violations thereof, (c) detect, prevent, or
                      otherwise address illegal or suspected illegal activities
                      (including payment fraud), security or technical issues,
                      or (d) protect against harm to the rights, property or
                      safety of Subdefy, its users or the public, as required or
                      permitted by law.
                    </li>
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      Business transfers: In connection with any reorganization,
                      restructuring, merger or sale, or other transfer of
                      assets, we will transfer information, including personal
                      information, provided that the receiving party agrees to
                      respect your personal information in a manner that is
                      consistent with our Privacy Statement. Whenever in the
                      course of sharing information we transfer personal
                      information to other countries, we will ensure that the
                      information is transferred in accordance with this Privacy
                      Statement and as permitted by the applicable laws on data
                      protection. You may also choose to disclose your
                      information in the following ways:
                    </li>
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      certain portions of our service may contain a tool which
                      gives you the option to share information by email, text
                      message and social or other sharing applications, using
                      the clients and applications on your smart device;
                    </li>
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      social plugins and similar technologies allow you to share
                      information. Social plugins and social applications are
                      operated by the social networks themselves, and are
                      subject to their terms of use and privacy policies. Access
                      to Account and Profiles
                    </li>
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      “Remember me” function: For ease of access to your
                      account, you can use the "Remember me on this device"
                      function when you log in to the website. This function
                      uses technology that enables us to provide direct account
                      access and to help administer the Subdefy service without
                      requiring reentry of any password or other user
                      identification when your browser revisits the service.
                    </li>
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      Giving others access to your account: If you share or
                      otherwise allow others to have access to your account,
                      they will be able to your personal account information
                      (including your email address, committed expenses entered
                      into the dashboard and/or other information in the
                      "Account" area of our website).
                    </li>
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      Profiles: Profiles allow users to have a distinct,
                      personalized Subdefy experience, built around the
                      subscriptions of interest to them, as well as separate
                      expense history. Please note that profiles are available
                      to everyone who uses your Subdefy account, so that anyone
                      with access to your Subdefy account can navigate to and
                      use, edit or delete profiles. You should explain this to
                      others with access to your account, and if you do not wish
                      them to use or change your profile, be sure to let them
                      know. Profile users may be offered the opportunity to add
                      an email address, phone number or other information to the
                      profile and will be provided with notice of collection and
                      use at the time such information is requested.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="policy-content mt-3">
                <h6>Your Choices</h6>
                <p>
                  Email and Text Messages. If you no longer want to receive
                  certain communications from us via email or text message,
                  simply click the "unsubscribe" link in the email or reply STOP
                  (or as otherwise instructed) to the text message. Please note
                  that you cannot unsubscribe from service-related
                  correspondence from us, such as messages relating to your
                  account transactions.
                </p>
                <p>
                  Email and Text Messages. If you no longer want to receive
                  certain communications from us via email or text message,
                  simply click the "unsubscribe" link in the email or reply STOP
                  (or as otherwise instructed) to the text message. Please note
                  that you cannot unsubscribe from service-related
                  correspondence from us, such as messages relating to your
                  account transactions.
                </p>
                <p>
                  {" "}
                  Push Notifications. You can choose to receive mobile push
                  notifications from Subdefy. On some device operating systems,
                  you will be automatically enrolled in the notifications. If
                  you subsequently decide you no longer wish to receive these
                  notifications, you can use your mobile device's settings
                  functionality to turn them off. We also offer push
                  notifications on certain web browsers. If you agree to receive
                  those notifications and subsequently decide you no longer wish
                  to receive these notifications, you can use your browser’s
                  settings to turn them off.
                </p>
                <p>
                  Interest-Based Ads. Interest-based ads are online ads that are
                  tailored to your likely interests based on your use of various
                  apps and websites across the Internet. If you are using a
                  browser, then cookies and web beacons can be used to collect
                  information to help determine your likely interests. If you
                  are using a mobile device, tablet, or device that includes a
                  resettable device identifier, then that identifier can be used
                  to help determine your likely interests. For your choices
                  about interest-based ads from Subdefy, please see the "Cookies
                  and Internet Advertising" section (below).
                </p>
                <p>
                  Matched Identifier Communications. Some third party sites and
                  apps allow us to reach our users with online promotions about
                  our services by sending a privacy protective identifier to the
                  third party. A privacy protective identifier means we convert
                  the original information (such as an email address or phone
                  number) into a value to keep the original information from
                  being revealed. The third party compares the privacy
                  protective identifier to identifiers in its database and there
                  will be a match only if you have used the same identifier
                  (such as an email address) with Subdefy and the third party.
                  If there is a match, Subdefy can then choose whether or not to
                  send a given promotional communication to you on that third
                  party site or app, and can optimize and better measure the
                  effectiveness of online advertising. You can opt out in the
                  “Marketing Communications” section of the “Account” section of
                  our website.
                </p>
                <p>Your Information and Rights</p>
                <p>
                  You can request access to your personal information or correct
                  or update out-of-date or inaccurate personal information we
                  hold about you. You may also request that we delete personal
                  information that we hold about you.
                </p>
                <p>
                  When you visit the "Account" portion of our website, you have
                  the ability to access and update a broad range of information
                  about your account, including your contact information, your
                  Subdefy payment information, and various related information
                  about your account. You must be signed in to access the
                  "Account" section. For information about deletion, removal and
                  retention of information, please email us at
                  support@subdefy.com with ‘Account Data Removal’ in the subject
                  line. We respond to all requests we receive from individuals
                  wishing to exercise their data protection rights in accordance
                  with applicable data protection laws. Please also see the
                  "Your Choices" section of this Privacy Statement for
                  additional choices regarding your information.
                </p>
                <p>
                  We may reject requests that are unreasonable or not required
                  by law, including those that would be extremely impractical,
                  could require disproportionate technical effort, or could
                  expose us to operational risks such as free trial fraud. We
                  may retain information as required or permitted by applicable
                  laws and regulations, including to honor your choices, for our
                  billing or records purposes and to fulfill the purposes
                  described in this Privacy Statement. We take reasonable
                  measures to destroy or de-identify personal information in a
                  secure manner when it is no longer required.
                </p>
              </div>
              <div className="policy-content">
                <h6>Security</h6>
                <p>
                  We use reasonable administrative, logical, physical and
                  managerial measures to safeguard your personal information
                  against loss, theft and unauthorized access, use and
                  modification. These measures are designed to provide a level
                  of security appropriate to the risks of processing your
                  personal information.
                </p>
              </div>
              <div className="policy-content">
                <h6>Changes to This Privacy Statement</h6>
                <p>
                  We will update this Privacy Statement from time to time in
                  response to changing legal, regulatory or operational
                  requirements. We will provide notice of any such changes
                  (including when they will take effect) in accordance with law.
                  Your continued use of the Subdefy service after any such
                  updates take effect will constitute acknowledgement and (as
                  applicable) acceptance of those changes. If you do not wish to
                  acknowledge or accept any updates to this Privacy Statement,
                  you may cease your use of the Subdefy service. To see when
                  this Privacy Statement was last updated, please see the "Last
                  Updated" section below.
                </p>
              </div>
              <div className="policy-content">
                <h6>Cookies and Internet Advertising</h6>
                <p>
                  We and our Service Providers use cookies and other
                  technologies (such as web beacons), as well as resettable
                  device identifiers, for various reasons. We want you to be
                  informed about our use of these technologies, so this section
                  explains the types of technologies we use, what they do, and
                  your choices regarding their use. Cookies and similar
                  technologies, web beacons, and resettable device identifiers
                </p>
                <p>
                  Cookies are small data files that are commonly stored on your
                  device when you browse and use websites and online services.
                  We use other technologies such as browser storage and plugins
                  (e.g., HTML5, IndexedDB, and WebSQL). Like cookies, these
                  other technologies may store small amounts of data on your
                  device. Web beacons (also known as clear gifs or pixel tags)
                  often work in conjunction with cookies. In many cases,
                  declining cookies will impair the effectiveness of web beacons
                  associated with those cookies.
                </p>
                <p>
                  {" "}
                  If you use the Subdefy app on a mobile device, tablet, or
                  other device, we may collect a resettable device identifier
                  from your device. Resettable device identifiers (also known as
                  advertising identifiers) are similar to cookies and are found
                  on many mobile devices and tablets (for example, the
                  "Identifier for Advertisers" (or IDFA) on Apple iOS devices
                  and the "Google Advertising ID" on Android devices), and
                  certain streaming media devices. Like cookies, resettable
                  device identifiers are used to make online advertising more
                  relevant and for analytics and optimization purposes.
                </p>
              </div>
              <div className="policy-content">
                <h6>Why does Subdefy use these technologies?</h6>
                <p>
                  We use these types of technologies for various reasons, like
                  making it easy to access our services by remembering you when
                  you return; to provide, analyze, understand and enhance the
                  use of our services; to enforce our terms, prevent fraud; to
                  improve site performance, monitor visitor traffic and actions
                  on our site; and to deliver and tailor our marketing or
                  advertising, and to understand interactions with our emails,
                  marketing, and online ads on third party sites.
                </p>
                <p>
                  To help you better understand how we use cookies and
                  resettable device identifiers, please see the information
                  below:
                </p>
              </div>
              <div className="list">
                <div className="head-list">
                  <ul className="list-section">
                    <li className="list-parent">
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      Essential cookies: These cookies are strictly necessary to
                      provide our website or online service. For example, we and
                      our Service Providers may use these cookies to
                      authenticate and identify our members when they use our
                      websites and applications so we can provide our service to
                      them. They also help us to enforce our Terms of Use,
                      prevent fraud and maintain the security of our service.
                    </li>
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      Performance and functionality cookies: These cookies help
                      us to customize and enhance your online experience with
                      Subdefy. For example, they help us to remember your
                      preferences and prevent you from needing to re-enter
                      information you previously provided (for example, during
                      member sign up). We also use these cookies to collect
                      information (such as popular pages, conversion rates,
                      viewing patterns, click-through and other information)
                      about our visitors' use of the Subdefy service so that we
                      can enhance and personalize our website and service and
                      conduct market research. Deletion of these types of
                      cookies may result in limited functionality of our
                      service.
                    </li>
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      Advertising cookies and resettable device identifiers:
                      These cookies and resettable device identifiers use
                      information about your use of this and other websites and
                      apps, your response to ads and emails, and to deliver ads
                      that are more relevant to you and for analytics and
                      optimization purposes. These types of ads are called
                      "interest-based advertising." The advertising cookies
                      associated with our service belong to our Service
                      Providers. In connection with our use of these
                      technologies, some of the websites and apps where we
                      advertise, as well as advertising technology companies
                      that we use to purchase, deliver, optimize, and/or measure
                      our advertisements (collectively “Advertising Partners”),
                      may receive limited information from us as part of our
                      campaign targeting, measurement, and optimization (e.g.,
                      steps completed in sign-up and site visit or app
                      open/install information). Common uses of this type of
                      information are to judge the effectiveness of and optimize
                      ad campaigns, by allowing Advertising Partners to see when
                      someone who saw an ad later signed up for our service.
                      Another common use is to make sure we do not serve ads
                      trying to get individuals to sign up for the Subdefy
                      service if they are already a Subdefy user.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="policy-content">
                <p>
                  Subdefy uses contractual and technical measures designed to
                  prevent Advertising Partners from accessing information
                  regarding specific title selections you make, URLs you land
                  on, or shows you have watched on our service. We do not share
                  information about title selections or your shows you have
                  watched on our service.
                </p>
              </div>
              <div className="policy-content">
                <h6>
                  To exercise choice regarding resettable device identifiers
                </h6>
                <p>
                  To opt out of interest-based ads from Subdefy in connection
                  with a resettable device identifier on a mobile device,
                  tablet, or streaming media devices, please configure the
                  appropriate setting on your device (usually found under
                  "privacy" or "ads" in your device's settings). You may still
                  see Subdefy ads on your device, but they will not be tailored
                  to your likely interests.
                </p>
                <p>
                  To exercise choice using self-regulatory program resources
                </p>
                <p>
                  Subdefy supports the following self-regulatory programs, which
                  provide additional privacy choices for interest-based
                  advertising:
                </p>
              </div>
              <div className="list">
                <div className="head-list">
                  <ul className="list-section">
                    <li className="list-parent">
                      {" "}
                      <span className="pr-25">
                        <FontAwesomeIcon
                          className="list-bullets px-1"
                          icon={faCircle}
                        />
                      </span>
                      In Europe: European Interactive Digital Advertising
                      Alliance (EDAA)
                    </li>
                  </ul>
                </div>
              </div>
              <div className="policy-content mt-4">
                <h6>To exercise choice regarding other technologies</h6>
                <p>
                  There are a number of ways to exercise choice regarding
                  technologies that are similar to cookies, such as browser
                  storage and plugins (e.g., HTML5, IndexedDB, and WebSQL). For
                  example, many popular browsers provide the ability to clear
                  browser storage, commonly in the settings or preferences area;
                  see your browser's help function or support area to learn
                  more. Other technologies, such as Silverlight storage, may be
                  cleared from within the application.
                </p>
              </div>
            </div>
          </div>
          <div className="privacy-policy-bottom"></div>
        </div>
      </section>

      {/**************** Footer component ****************/}
      <Footer />

      {/**************** Back to top component ****************/}
      <BackToTopButton />
    </div>
  );
};

export default Privacy_policy;
