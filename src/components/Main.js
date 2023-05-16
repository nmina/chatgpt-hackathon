import './virtualCardsList.css';
import {Box, Container} from "@mui/material";
import React, {useState} from "react";
import Chat from "./Chat";
import ResultTable from "./ResultTable";
import testData from "../ai/test-data.json";

export function Main() {
  const [data, setData] = useState(testData);
  
  return (
    <Box id="resultContainer">
      <Chat/>
      <ResultTable records={data}/>
      <Graph/>
      <MoreDetails/>
    </Box>
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
