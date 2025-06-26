import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { nekosenseInstance } from "../nekosenseInstance.ts";

const RouterTracker = () => {
  const location = useLocation();

  useEffect(() => {
    nekosenseInstance.start();
  }, [location.pathname]);

  return null;
};

export default RouterTracker;
