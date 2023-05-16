import './virtualCardsList.css';
import {Box, Container} from "@mui/material";
import React from "react";
import {GridColDef} from "@mui/x-data-grid";
import Chat from "./Chat";

export function Main() {
  return (
    <Box id="resultContainer">
      <Chat/>
      <Table/>
      <Graph/>
      <MoreDetails/>
    </Box>
  );
}

function Table() {
  return (
    <Container maxWidth="lg" id="tableContainer">
      Table will go here
    </Container>
  );
}

function Graph() {
  return (
    <Container maxWidth="lg" id="graphContainer">
      Graph will go here
    </Container>
  );
}

function MoreDetails() {
  return (
    <Container maxWidth="lg" id="moreDetailsContainer">
      More Details will go here
    </Container>
  );
}

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Virtual Card',
    width: 200
  },
  {
    field: 'cardToken',
    headerName: 'Card Token',
    width: 200,
    editable: false,
    sortable: true
  },
  {
    field: 'expirationDate',
    headerName: 'Expiration Date',
    width: 200,
    editable: false,
    sortable: true
  },
  {
    field: 'cardholderName',
    headerName: 'Cardholder Name',
    width: 200,
    editable: false,
    sortable: true
  }
];
