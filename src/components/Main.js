import './virtualCardsList.css';
import {Box, Container} from "@mui/material";
import React, {useState} from "react";
import Chat from "./Chat";
import ResultTable from "./ResultTable";
import ResultsSection from "./ResultsSection";
import testData from "../ai/test-data.json";

export function Main() {
  const [data, setData] = useState("");
  
  return (
    <Box id="resultContainer">
      <Chat setData={setData}/>
      <ResultsSection data={data}/>
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
