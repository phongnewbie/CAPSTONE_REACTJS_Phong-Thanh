import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Loading() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.LoadingReducer.isLoading);

  return (
    <Fragment>
      {isLoading ? (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "100",
            color: "#fff",
            fontSize: "40px",
          }}
        >
          Loading...
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
