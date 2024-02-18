const styles = {
  listData: {
    textDecoration: "none",
    listStyle: "none",
  },
  listDataDecimal: {
    textDecoration: "none",
    listStyle: "decimal",
    paddingLeft: "15px",
  },
};
const policy = [
  {
    id: "1",
    ans: () => {
      return (
        <div>
          <p>
            This privacy policy has been compiled to better serve those who are
            concerned with how their 'Personally identifiable information' (PII)
            is being used online. PII, as used in India privacy law and
            information security, is information that can be used on its own or
            with other information to identify, contact, or locate a single
            person, or to identify an individual in context. Please read our
            privacy policy carefully to get a clear understanding of how we
            collect, use, protect or otherwise handle your Personally
            Identifiable Information in accordance with our website.
          </p>
          <br />
        </div>
      );
    },
  },
  {
    id: "2",
    que: "Personal information collection",
    ans: () => {
      return (
        <div>
          <p>
            When registering or purchasing on our site, as appropriate, you may
            be asked to enter your name, email address, mailing address, credit
            card information or other technical details such as your IP address,
            date and time to help you with your experience.
          </p>
        </div>
      );
    },
  },
  {
    id: "3",
    que: "How do we use your information?",
    ans: () => {
      return (
        <div>
          <p>
            We may use the information we collect from you when you register,
            make a purchase, sign up for our newsletter, respond to a survey or
            marketing communication, surf the website, or use certain other site
            features in the following ways:
          </p>
          <ul style={styles.listData}>
            <li>
              To personalize user's experience and to allow us to deliver the
              type of content and product offerings in which you are most
              interested.
            </li>
            <li>
              To allow us to better service you in responding to your customer
              service requests.
            </li>
            <li>To quickly process your transactions.</li>
            <li>
              To send periodic emails regarding your order or other products and
              services.
            </li>
          </ul>
        </div>
      );
    },
  },
  {
    id: "4",
    que: "How do we protect visitor information?",
    ans: () => {
      return (
        <div>
          <p>
            Our website is scanned on a regular basis for security holes and
            known vulnerabilities in order to make your visit to our site as
            safe as possible.
          </p>
        </div>
      );
    },
  },
  {
    id: "5",
    que: "We do not use Malware Scanning",
    ans: () => {
      return (
        <div>
          <p>
            Your personal information is contained behind secured networks and
            is only accessible by a limited number of persons who have special
            access rights to such systems, and are required to keep the
            information confidential. We implement a variety of security
            measures when a user enters, submits, or accesses their information
            to maintain the safety of your personal information.
          </p>
          <p>
            All payment transactions are processed through a gateway provider
            and are not stored or processed on our servers.
          </p>
        </div>
      );
    },
  },
  {
    id: "6",
    que: "Do we use Cookies?",
    ans: () => {
      return (
        <div>
          <p>
            Yes. Cookies are small files that a site or its service provider
            transfers to your computer's hard drive through your Web browser (if
            you allow) that enables the site's or service provider's systems to
            recognize your browser and capture and remember certain information.
            <br />
            We use cookies to:
            <br />
            <br />
          </p>
          <ul style={styles.listDataDecimal}>
            <li>
              Understand and save user's preferences for future visits based on
              current or previous site activity.
            </li>
            <li>
              Compile aggregate data about site traffic and site interactions in
              order to offer better site experiences and tools in the future. We
              may also use trusted third-party services that track this
              information on our behalf.
            </li>
            <li>
              You can choose to have your computer warn you each time a cookie
              is being sent, or you can choose to turn off all cookies. You do
              this through your browser (like Internet Explorer) settings. Each
              browser is a little different, so look at your browser's Help menu
              to learn the correct way to modify your cookies.
            </li>
          </ul>
          <br />
          <p>
            If you disable cookies off, some features will be disabled It won't
            affect the user's experience that makes your site experience more
            efficient and some of our services will not function properly.
            However, you can still surf the website.
          </p>
        </div>
      );
    },
  },
  {
    id: "7",
    que: "Third party Disclosure",
    ans: () => {
      return (
        <div>
          <p>
            We do not sell, trade, or otherwise transfer to outside parties your
            personally identifiable information unless we provide users with
            advance notice. This does not include website hosting partners and
            other parties who assist us in operating our website, conducting our
            business, or serving our users, so long as those parties agree to
            keep this information confidential. We may also release information
            when it's release is appropriate to comply with the law, enforce our
            site policies, or protect ours or others' rights, property, or
            safety. However, non-personally identifiable visitor information may
            be provided to other parties for marketing, advertising, or other
            uses.
          </p>
        </div>
      );
    },
  },
  {
    id: "8",
    que: "Third-party links",
    ans: () => {
      return (
        <div>
          <p>
            Occasionally, at our discretion, we may include or offer third-party
            products or services on our website. These third-party sites have
            separate and independent privacy policies. We, therefore, have no
            responsibility or liability for the content and activities of these
            linked sites. Nonetheless, we seek to protect the integrity of our
            site and welcome any feedback about these sites. We honor do not
            track signals and do not track plant cookies, or use advertising
            when a Do Not Track (DNT) browser mechanism is in place. It's also
            important to note that we allow third-party behavioral tracking.
          </p>
        </div>
      );
    },
  },
  {
    id: "9",
    que: "GDPR Regulation",
    ans: () => {
      return (
        <div>
          <p>
            For the purposes of applicable EU data protection law (including the
            General Data Protection Regulation 2016/679 (the "GDPR"), we are a
            'data controller' of your personal information.
          </p>
        </div>
      );
    },
  },
  {
    id: "10",
    que: "How you can access your personal information",
    ans: () => {
      return (
        <div>
          <p>
            You are also entitled to ask us to post your personal information
            (i.e. to transfer in a structured, commonly used and
            machine-readable format, to you), to erase it, or restrict its
            processing. You also have rights to object to some processing that
            is based on our legitimate interests, such as profiling that we
            perform for the purposes of direct marketing, and, where we have
            asked for your consent to process your data, to withdraw this
            consent as more fully described below.
            <br />
            These rights are limited in some situations - for example, we can
            demonstrate that we have a legal requirement to process your
            personal information. In some instances, this means that we may
            retain some data even if you withdraw your consent.
            <br />
            Where we require your personal information to comply with legal or
            contractual obligations, then provision of such data is mandatory:
            if such data is not provided, then we will not be able to manage our
            contractual relationship with you or to meet obligations placed on
            us. In all other cases, provision of requested personal information
            is optional.
            <br />
            If you have unresolved concerns you also have the right to complain
            to data protection authorities. The relevant data protection
            authority will be the data protection authority of the country: (i)
            of your habitual residence; (ii) of your place of work; or (iii) in
            which you consider the alleged infringement has occurred.
            <br />
            Both personal information and personal data have the same meaning in
            the context of this Privacy Policy.
            <br />
            <br />
            <p>Last updated on December 16th, 2022</p>
          </p>
        </div>
      );
    },
  },
  {
    id: "11",
    que: "Question or Suggestions",
    ans: () => {
      return (
        <div>
          <p>
            If you have comments or questions regarding our Privacy Policy
            please contact us at: hello@sketchish.com
          </p>
        </div>
      );
    },
  },
];

export default policy;
