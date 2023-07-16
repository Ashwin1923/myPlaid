import React, { useState, useEffect } from "react";
import axios from "axios";

const PlaidAuth = props => {
  useEffect(() => {
    async function fetchData() {
      let accessToken = await axios.post("/api/exchange_public_token", {
        public_token: props.publicToken
      });
      console.log("accessToken", accessToken.data);
      const auth = await axios.post("/api/auth", {
        access_token: accessToken.data.accessToken
      });
      console.log("auth data", auth.data);
    }
    fetchData();
  });
  return <div>Authenticated {props.metaData.institution.name}</div>;
};

export default PlaidAuth;
