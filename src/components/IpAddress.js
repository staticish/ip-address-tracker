import { React } from "react";

export default function IpAddress(props) {
  return (
    <div className="float flex">
      <div>
        Ip Address
        <h1> {props.ip} </h1>
      </div>

      <div>
        Location
        <h1> {props.location} </h1>
      </div>

      <div>
        Timezone
        <h1> {"Utc " + props.timeZone} </h1>
      </div>

      <div>
        ISp
        <h2> {props.isp} </h2>
      </div>
    </div>
  );
}
