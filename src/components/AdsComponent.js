import React, { useEffect } from 'react';

const AdsComponent = ({ dataAdSlot, adBy, className,adSize, width, height  }) => {

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
    catch (e) {
      console.error(e)
    }
  }, []);

  // useEffect(() => {
  //   // Load the Google AdSense script
  //   const script = document.createElement('script');
  //   script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5297563475092118';
  //   script.async = true;
  //   script.crossOrigin = "anonymous"
  //   document.head.appendChild(script);

  //   // Initialize the ad
  //   (window.adsbygoogle = window.adsbygoogle || []).push({
  //     google_ad_client: 'ca-pub-5297563475092118',
  //     // enable_page_level_ads: true,
  //   });

  //   // Clean up on component unmount
  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, []);

  return (
    <>
      {adBy == "google" ?(<>
        {
          adSize == 'fix' ? <ins class="adsbygoogle"
            style={{ display: "inline-block", width: width ? width: "728px", height: height ? height:"90px" }}
            data-ad-client="ca-pub-5297563475092118"
            data-ad-slot={dataAdSlot}></ins> : <ins class={`adsbygoogle ${className}`}
            style={{ display: 'block'}}
            data-ad-client="ca-pub-5297563475092118"
            data-ad-slot={dataAdSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        }
      </>) : <script src="https://alwingulla.com/88/tag.min.js" data-zone={dataAdSlot} async data-cfasync="false"></script>}

      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5297563475092118"
        crossorigin="anonymous"></script>
    </>
    
  );
};



export default AdsComponent;