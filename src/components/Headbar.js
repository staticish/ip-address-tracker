import { React, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import IpAddress from "./IpAddress";
import Map from "./Map";
import axios from "axios";
const generateIP = () => {
  return fetch(`https://api64.ipify.org?format=json`).then((resp) =>
    resp.json()
  );
};
export default function Headbar() {
  const [firstIP, setFirstIP] = useState("");
  const [error, setError] = useState("");

  generateIP().then((data) => {
    const ip = data.ip;
    setFirstIP(ip);
  });

  const mutation = useMutation((ip) => {
    const url = Boolean(ip)
      ? `
      https://geo.ipify.org/api/v2/country,city?apiKey=at_bMogdGJraG5KBrBdZ2BMTMbPhIrwY&ipAddress=${ip}`
      : ` https://geo.ipify.org/api/v2/country,city?apiKey=at_bMogdGJraG5KBrBdZ2BMTMbPhIrwY&ipAddress=${firstIP}`;

    return axios.get(url).then((data) => data.data);
  });

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const ip = form.elements["ip"].value;
    setError("Invalid IP, please try again.");
    mutation.mutate(ip);
  }

  useEffect(() => {
    mutation.mutate();
  }, []);
  return (
    <div className="container">
      <div className="headbar flex">
        <img src={require("../images/pattern-bg.png").default} alt="pattern" />

        <form className="searchIpAddress absolute" onSubmit={handleSubmit}>
          <h1>IP Address Tracker </h1>
          <input
            id="ip"
            name="ip"
            type="text"
            placeholder="Search for any IP address or domain"
          />
          <button className="absolute">
            <img
              src={require("../images/icon-arrow.svg").default}
              alt="arrow"
            />
          </button>
        </form>
        <div className="floatBox absolute flex">
          {mutation.error ? (
            <h2 className="letter-spacing-1"> Error: {error}</h2>
          ) : null}
          {mutation.data ? (
            <IpAddress
              ip={mutation.data.ip}
              location={mutation.data.location.region}
              timeZone={mutation.data.location.timezone}
              isp={mutation.data.isp}
            />
          ) : (
            <h2> Loading... </h2>
          )}
        </div>
      </div>
      {mutation.data ? (
        <Map
          lat={mutation.data.location.lat}
          long={mutation.data.location.lng}
        />
      ) : null}
    </div>
  );
}
