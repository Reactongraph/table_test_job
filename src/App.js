import { useState, useEffect } from "react";
import namesEmailsData from "./data/namesEmailsData.json";
import ccNumbersData from "./data/ccNumbersData.json";
import "./App.css";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

function getEmailsWithCcNumbers(namesEmailsData, ccNumbersData) {
  const emailsWithCcNumbers = namesEmailsData.reduce(
    (result, { id, email, first_name, last_name }) => {
      const ccNumbers = ccNumbersData.filter(
        ({ email: ccEmail }) => email === ccEmail
      );
      if (ccNumbers.length === 1) {
        const { cc_number } = ccNumbers[0];
        result.push({
          id,
          name: `${first_name} ${last_name}`,
          email,
          cc_number,
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
    { field: "email", headerName: "email", width: 100 },
    { field: "cc_number", headerName: "cc_number", width: 100 },
  ];
  console.log("data", emailsWithCcNumbers);
  return (
    <>
      <Typography variant="h3">Table Data</Typography>
      <DataGrid
        rows={emailsWithCcNumbers}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        pageSizeOptions={[5]}
        // checkboxSelection
        // disableSelectionOnClick
      />
    </>
  );
}

export default App;
