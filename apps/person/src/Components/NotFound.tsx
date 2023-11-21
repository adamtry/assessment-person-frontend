import React from "react";

export const NotFound = () => {
  return <div>
    <p className="lbh-body-s">Page not found</p>
    <p className="lbh-body-s">Is the API running at {process.env.API_URL}?</p>
    </div>;
};
