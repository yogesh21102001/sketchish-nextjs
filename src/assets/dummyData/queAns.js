// const queAns = [
//   {
//     id: "1",
//     que: "What is OpenStroke®?",
//     ans: () => {
//       return (
//         <div>
//           <p>
//             OpenStroke is an original stroke icon as created so you can modify
//             icon stroke without completely recreating the same. For example, if
//             the icon has a square with 4 pixel rounded corner, you should be
//             able to change the corner from 4 pixel to any if your software
//             supports it.
//           </p>
//         </div>
//       );
//     },
//   },
//   {
//     id: "2",
//     que: "What is OneStroke®?",
//     ans: () => {
//       return (
//         <div>
//           <p>
//             An icon that has no start point and end point. OneStroke is a close
//             node or shape icon. Ie. 12 O'clock icons generally have a circle as
//             one shape, and an arrow at 12 is another shape when OneStroke has
//             only one shape.
//           </p>
//         </div>
//       );
//     },
//   },
//   {
//     id: "3",
//     que: "Do you make custom icons? What is your rate?",
//     ans: () => {
//       return (
//         <div>
//           <p>
//             Yes, We do provide custom icons services - same sizes, file types
//             and quality as regular OpenStroke library. If you want to make a
//             rough idea about the price and actual time needed to create them,
//             please drop a line on the contact page.
//           </p>
//         </div>
//       );
//     },
//   },
//   {
//     id: "4",
//     que: "Can I modify icons?",
//     ans: () => {
//       return (
//         <div>
//           <p>
//             Yes, We understand it very well and we do allow you to modify icons
//             as per need. You can adjust icons so they fit in your project by
//             changing their color, size, or even by combining them together. Just
//             avoid manipulation of their shape. For example, if you need to
//             change the time shown by the clock icon, it's fine.
//           </p>
//         </div>
//       );
//     },
//   },
//   {
//     id: "5",
//     que: "How do I get about the new icons collection?",
//     ans: () => {
//       return (
//         <div>
//           <p>
//             You'll get an email as soon as the new version is out or if we add
//             some great collection, you do not have to do anything extra in order
//             to get these emails.
//           </p>
//         </div>
//       );
//     },
//   },
//   {
//     id: "6",
//     que: "Will I get an invoice for my purchase?",
//     ans: () => {
//       return (
//         <div>
//           <p>
//             Of course! Kindly go to your profile by clicking your avatar on top
//             right. Navigation from profile tab to Invoices and download your
//             invoice.
//           </p>
//         </div>
//       );
//     },
//   },
//   {
//     id: "7",
//     que: "What are the payment methods?",
//     ans: () => {
//       return (
//         <div>
//           <p>
//             We are accepting Stripe as a payment method. Once payment is made
//             successfully, enjoy our premium icons library or download the icon
//             that you need.
//           </p>
//         </div>
//       );
//     },
//   },
//   {
//     id: "8",
//     que: "Can I use downloaded icons to create work for a client?",
//     ans: () => {
//       return (
//         <div>
//           <p>
//             You can use our icons for your projects as long as they comply with
//             our usage &nbsp;<a href="/privacypolicy">policy.</a>
//           </p>
//         </div>
//       );
//     },
//   },
//   {
//     id: "9",
//     que: "Is my subscription automatically renewed every month?",
//     ans: () => {
//       return (
//         <div>
//           <p>
//             Yes. Your subscription will renew automatically unless you cancel
//             this option (always with the original price, no discounts apply for
//             renewals). To cancel the automatic renewal of your subscription and
//             avoid future non-desired payments, you must cancel your subscription
//             from your user's profile.
//           </p>
//         </div>
//       );
//     },
//   },
//   {
//     id: "10",
//     que: "Can I cancel my subscription and ask for a refund of my purchase?",
//     ans: () => {
//       return (
//         <div>
//           <p>
//             We want you to be happy. So, if you are not completely satisfied
//             with our services, we offer a 7-day refund guarantee. You can get
//             the full refund within 7 days from the purchase date. You didn't get
//             to use the service, that is, you haven't downloaded any icon.
//           </p>
//           <br />
//           <p>
//             If that is your case, you can request the refund through
//             hello@sketchish.com You can only request a refund for the current
//             billing period. Please note that previous subscriptions cannot be
//             refunded. For more information, read our &nbsp;
//             <a href="/termsandconditions">Terms of use.</a>
//           </p>
//         </div>
//       );
//     },
//   },
//   {
//     id: "11",
//     que: "Do you have any other questions?",
//     ans: () => {
//       return (
//         <div>
//           <p>
//             If you didn't find the answer to your question, please &nbsp;
//             <a href="mailto:hello@sketchish.com">drop an email.</a>
//           </p>
//         </div>
//       );
//     },
//   },
// ];

const queAns = [
  {
    id: "1",
    que: "What is OpenStroke®?",
    ans: () => {
      return (
        <div>
          <p>
            OpenStroke is basically an open path with stroke weight applied to
            it which can modify without recreating from scratch.
          </p>
        </div>
      );
    },
  },
  {
    id: "2",
    que: "What is a BrokenStroke?",
    ans: () => {
      return (
        <div>
          <p>
            Stroke converted to a shape is a broken stroke. Many popular design
            software provides these features and the general term used is
            outline stroke.
          </p>
        </div>
      );
    },
  },
  {
    id: "3",
    que: "Do you make custom icons?",
    ans: () => {
      return (
        <div>
          <p>
            Yes, We do provide custom icons services. If you want to make a
            rough idea about the price and actual time needed to create them,
            please drop a line on the <a href="/contactus">contact us</a> page.
          </p>
        </div>
      );
    },
  },
  {
    id: "4",
    que: "Can I modify icons?",
    ans: () => {
      return (
        <div>
          <p>
            We understand it very well and we do allow you to modify icons as
            per need. You can adjust icons so they fit in your project by
            changing their color, size, or even by combining them together. Just
            avoid manipulation of their shape.
          </p>
        </div>
      );
    },
  },
  {
    id: "5",
    que: "How do I get about the new icons collection?",
    ans: () => {
      return (
        <div>
          <p>
            You'll get an email as soon as the new version is out or if we add
            some great collection, you do not have to do anything extra in order
            to get these emails.
          </p>
        </div>
      );
    },
  },
  {
    id: "6",
    que: "Will I get an invoice for my purchase?",
    ans: () => {
      return (
        <div>
          <p>
            Of course! Kindly go to your profile by clicking your avatar on top
            right. Navigation from profile tab to Invoices and download your
            invoice.
          </p>
        </div>
      );
    },
  },
  {
    id: "7",
    que: "What are the payment methods?",
    ans: () => {
      return (
        <div>
          <p>
            We are accepting Stripe as a payment method. Once payment is made
            successfully, enjoy our premium icons library.
          </p>
        </div>
      );
    },
  },
  {
    id: "8",
    que: "Can I use downloaded icons to create work for a client?",
    ans: () => {
      return (
        <div>
          <p>
            You can use our icons for your projects as long as they comply with
            our usage &nbsp;<a href="/privacypolicy">policy.</a>
          </p>
        </div>
      );
    },
  },
  {
    id: "9",
    que: "Is my subscription automatically renewed every month?",
    ans: () => {
      return (
        <div>
          <p>
            Yes. Your subscription will renew automatically unless you cancel
            this option (always with the original price, no discounts apply for
            renewals). To cancel the automatic renewal of your subscription and
            avoid future non-desired payments, you must cancel your subscription
            from your user’s profile.
          </p>
        </div>
      );
    },
  },
  {
    id: "10",
    que: "Can I cancel my subscription and ask for a refund of my purchase?",
    ans: () => {
      return (
        <div>
          <p>
            We want you to be happy. So, if you are not completely satisfied
            with our services, we offer a <b>7-day refund guarantee</b>. You can
            get the full refund within 7 days from the purchase date. You didn’t
            get to use the service, that is, you haven’t downloaded any icon.
          </p>
          <br />
          <p>
            If that is your case, you can request the refund through{" "}
            <a href="mailto:hello@sketchish.com">hello@sketchish.com</a>
          </p>
          <br />
          <p>
            You can only request a refund for the current billing period. Please
            note that previous subscriptions cannot be refunded. For more
            information, read our &nbsp;
            <a href="/termsandconditions">Terms of use.</a>
          </p>
        </div>
      );
    },
  },
  {
    id: "11",
    que: "Do you have any other questions?",
    ans: () => {
      return (
        <div>
          <p>
            If you didn't find the answer to your question,, please &nbsp;
            <a href="mailto:hello@sketchish.com">drop an email.</a>
          </p>
        </div>
      );
    },
  },
];

export default queAns;
