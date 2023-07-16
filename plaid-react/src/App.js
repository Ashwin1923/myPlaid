import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
import PlaidAuth from "./components/PlaidAuth";

axios.defaults.baseURL = "http://localhost:8000";

const App = () => {
  const [linkToken, setLinkToken] = useState("");
  const [publicToken, setPublicToken] = useState("");
  const [metaData, setMetaData] = useState();
  // const [accessToken, setAccessToken] = useState(null);

  // const handleOnSuccess = async (publicToken, metadata) => {
  //   try {
  //     const response = await axios.post("/api/plaid/exchange_token", {
  //       publicToken
  //     });
  //     const { accessToken } = response.data;
  //     setAccessToken(accessToken);
  //   } catch (error) {
  //     console.error("Axios error:", error);
  //   }
  // };

  useEffect(() => {
    async function fetch() {
      const response = await axios.post("/api/create_link_token");
      console.log("response", response.data);
      if (response.data != null) {
        setLinkToken(response.data.link_token);
      }
    }
    fetch();
    // console.log("accessToken");
    // console.log(accessToken);
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      console.log("success", public_token, metadata);
      setPublicToken(public_token);
      setMetaData(metadata);
    }
  });
  return publicToken ? (
    <PlaidAuth publicToken={publicToken} metaData={metaData} />
  ) : (
    <div
      style={{
        display: "grid",
        padding: 20,
        placeItems: "center",
        height: 400
      }}
    >
      <button style={{ height: 40 }} onClick={() => open()} disabled={!ready}>
        Connect a bank account
      </button>
    </div>
  );
};

export default App;
