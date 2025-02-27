import { useEffect } from "react";

const FacebookEmbed = () => {
  useEffect(() => {
    if (!window.FB) {
      const script = document.createElement("script");
      script.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => window.FB && window.FB.XFBML.parse();
    } else {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-[40%] flex justify-center">
        <div
          className="fb-video"
          data-href="https://www.facebook.com/reel/1368719407893096"
          // data-width="100%"
          data-show-text="false"
        />
      </div>
    </div>
  );
};

export default FacebookEmbed;
