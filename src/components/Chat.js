import React, {useEffect} from "react";
import {Button, Container, TextField} from "@mui/material";
import Alert from '@mui/joy/Alert';
import './chat.css';
import SpeechToText from "./SpeechToText";
import {sendMessage} from "../ai/chat-ai";

let questionRef;

const USER = "User";
const BOT = "Bot";

const Chat = ({records}) => {
  const [chatHistory, setChatHistory] = React.useState([]);
  const [transcript, setTranscript] = React.useState('');
  const [speechToText, setSpeechToText] = React.useState('');
  
  useEffect(() => {
    setTranscript(speechToText);
    questionRef.focus();
  }, [speechToText]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateChatHistory(USER, questionRef.value);
    
    sendMessage(questionRef.value)
      .then(response => {
        updateChatHistory(BOT, response);
      });
    
    clearInput(e);
  }
  
  const handleEnter = (e) => {
    if (e.key === 'Enter' && questionRef.value !== '') {
      handleSubmit(e);
    }
  };
  
  const clearInput = (e) => {
    console.log('called', e);
    e.preventDefault();
    setTranscript('');
  }
  
  const updateChatHistory = (from, message) => {
    setChatHistory(current => [{
      from: from,
      message: message
    }, ...current]);
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
                   onChange={e => setTranscript(e.target.value)}
                   onKeyUp={handleEnter}/>
        <SpeechToText setSpeechToText={setSpeechToText}/>
      </Container>
      <Container maxWidth="lg" id="buttons">
        <Button onClick={clearInput}>Clear</Button>
        <Button
          onClick={handleSubmit}>Submit</Button>
      </Container>
      <ChatSpace chatHistory={chatHistory}/>
    </Container>);
}

const ChatSpace = ({chatHistory}) => {
  return (<div id="chatSpace">{chatHistory
    .map((chat, i) =>
      <Alert
        key={i}
        variant='outlined'
        color={chat.from === 'User' ? 'primary' : 'success'}>
        <div className="role">{chat.from}:</div>
        <div className="message">{chat.message}</div>
      </Alert>)}</div>)
}

export default Chat;
