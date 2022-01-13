import React from "react";
import { Breadcrumb, Divider } from "antd";
import { useHistory } from "react-router-dom";

export default function PageHeader(props) {
  const { data, theme } = props;
  const history = useHistory();

  const dataLength = data.length;
  return (
    <div className="mt-80 mb-4">
      <Breadcrumb separator={<span className={"fs-20" +
                  (theme === "white" ? "color-white" : "color-light-grey-2")}>{`>`}</span>}>
        <span
          className={
            "fs-18 pl-2 py-2 " +
            (theme === "white" ? "color-white" : "color-light-grey-2")
          }
        >
          Current Location:{" "}
        </span>
        {data.map((item, index) => {
          if (index === dataLength - 1) {
            return (
              <Breadcrumb.Item
                key={index}
                className={
                  "fs-18 pl-2 py-29" +
                  (theme === "white" ? "color-light-blue" : "color-light-theme")
                }
                // onClick={()=>history.push(item.path)}
              >
                <span className="text-capitalize">{item.title}</span>
              </Breadcrumb.Item>
            );
          } else {
            return (
              <Breadcrumb.Item
                key={index}
                className={
                  "fs-18 pl-2 py-2 " +
                  (theme === "white" ? "color-white" : "color-light-grey-2")
                }
                // onClick={()=>history.push({
                //   pathname: item.path,
                //   search: item.search,
                // })}
              >
                <span className="text-capitalize">{item.title}</span>
              </Breadcrumb.Item>
            );
          }
        })}
      </Breadcrumb>

      <Divider className={`m-1 ${theme === "white" && "bg-dark-theme"}`} />
    </div>
  );
}
