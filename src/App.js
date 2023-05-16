import { useState, useEffect } from "react";
import namesEmailsData from "./data/namesEmailsData.json";
import ccNumbersData from "./data/ccNumbersData.json";
import "./App.css";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";

function getEmailsWithCcNumbers(namesEmailsData, ccNumbersData) {
  const emailsWithCcNumbers = namesEmailsData.reduce(
    (result, { id, email, first_name, last_name }) => {
      const ccNumbers = ccNumbersData.filter(
        ({ email: ccEmail }) => email == ccEmail
      );

      if (ccNumbers.length > 0) {
        const ccNumber = ccNumbers?.map((cc_number) => {
          return cc_number.cc_number;
        });

        const ccNumberStr = ccNumber.join(",");

        result.push({
          id,
          name: `${first_name} ${last_name}`,
          email,
          ccNumberStr,
        });
      }
      return result;
    },
    []
  );
  return emailsWithCcNumbers;
}

function App() {
  const [emailsWithCcNumbers, setEmailsWithCcNumbers] = useState([]);

  useEffect(() => {
    setEmailsWithCcNumbers(
      getEmailsWithCcNumbers(namesEmailsData, ccNumbersData)
    );
  }, []);
  const columns = [
    { field: "id", headerName: "id", width: 100 },
    { field: "name", headerName: "name", width: 150 },
    { field: "email", headerName: "email", width: 250 },
    { field: "ccNumberStr", headerName: "cc_number", width: 300 },
  ];

  return (
    <>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          sx={{ textAlign: "center", marginBottom: "1px" }}
        >
          Table Data
        </Typography>
        <DataGrid
          rows={emailsWithCcNumbers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          pageSizeOptions={[5]}
        />
      </Container>
    </>
  );
}

export default App;
