import { useEffect, useState } from "react";

const MobileOnly = ({ children }) => {
  const [isMobilePhone, setIsMobilePhone] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;

    // Detect ONLY mobile phones (not tablets, not desktop)
    const mobilePhoneRegex =
      /iPhone|Android.+Mobile|Windows Phone|webOS|BlackBerry|IEMobile|Opera Mini/i;

    setIsMobilePhone(mobilePhoneRegex.test(ua));
  }, []);

  if (!isMobilePhone) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h1 className="text-2xl font-bold mb-2">Mobile Only 📱</h1>
          <p className="text-gray-500">
            Please open this website on a mobile phone.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default MobileOnly;
