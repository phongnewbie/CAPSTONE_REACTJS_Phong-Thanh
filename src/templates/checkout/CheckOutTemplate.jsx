import { React, useEffect } from "react";
import CheckOut from "../../pages/checkoutrap/CheckOut";
import { USER_LOGIN } from "../../utils/constant";
import { Result } from "antd";
import { history } from "../../utils/history";

export default function CheckOutTemplate() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let isLogin = localStorage.getItem(USER_LOGIN);
  return (
    <div>
      {isLogin ? (
        <CheckOut />
      ) : (
        <div className="container">
          <Result status="warning" title="Bạn phải đăng nhập để đặt vé" />
          <div style={{ width: "100%", textAlign: "center" }}>
            <button
              onClick={() => {
                history.push("/login");
              }}
              className="btn btn-primary"
            >
              Đến trang đăng nhập
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
