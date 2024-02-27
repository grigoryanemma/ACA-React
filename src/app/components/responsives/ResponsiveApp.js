import { useEffect, useState } from "react";
import { SCREEN_SIZES } from "../../constants/screenSize";
import DesktopComponent from "./DesktopComponent";
import MobileComponent from "./MobileComponent";
import TabletComponent from "./TabletComponent";

const ResponsiveApp = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  let content = null;

  const handleWindowSize = () => {
    console.log(window.innerWidth);
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSize);

    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, []);

  switch (true) {
    case windowSize >= SCREEN_SIZES.Desktop: {
      content = <DesktopComponent />;
      break;
    }

    case windowSize >= SCREEN_SIZES.Tablet.Min &&
      windowSize <= SCREEN_SIZES.Tablet.Max: {
      content = <TabletComponent />;
      break;
    }

    case windowSize <= SCREEN_SIZES.Mobile: {
      content = <MobileComponent />;
      break;
    }

    default:
      content = <></>;
  }

  return <div>{content}</div>;
};

export default ResponsiveApp;
