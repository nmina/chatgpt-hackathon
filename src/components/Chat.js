import React, {useEffect} from "react";
import {Button, Container, TextField} from "@mui/material";
import Alert from '@mui/joy/Alert';
import './chat.css';
import SpeechToText from "./SpeechToText";

let questionRef;

const Chat = () => {
  const [chatHistory, setChatHistory] = React.useState([]);
  const [transcript, setTranscript] = React.useState('');
  const [speechToText, setSpeechToText] = React.useState('');
  
  useEffect(() => {
    console.log('hi');
    setTranscript(speechToText);
  }, [speechToText]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setChatHistory(current => [{
      sender: 'user',
      message: questionRef.value
    }, ...current]);
    clearInput();
  }
  
  const clearInput = (e) => {
    e.preventDefault();
    questionRef.value = "";
  }
  
  return (
    <Container maxWidth="lg" id="chatContainer">
      <Container maxWidth="lg" id="question">
        <TextField id="question"
                   label="Type here..."
                   variant="standard"
                   inputRef={instance => questionRef = instance}
                   sx={{flex: 1}}
                   value={transcript}
                   onChange={e => setTranscript(e.target.value)}/>
        <SpeechToText setSpeechToText={setSpeechToText}/>
      </Container>
      <Container maxWidth="lg" id="buttons">
        <Button onClick={clearInput}>Clear</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </Container>
      <ChatSpace chatHistory={chatHistory}/>
    </Container>);
}

const ChatSpace = ({chatHistory}) => {
  return (<div id="chatSpace">{chatHistory.map(chat => <Alert variant="outlined">{chat}</Alert>)}</div>)
}

export default Chat;
