import React, {useEffect, useRef} from "react";
import {Button, Container, LinearProgress, TextField} from "@mui/material";
import Alert from '@mui/joy/Alert';
import './chat.css';
import SpeechToText from "./SpeechToText";
import {sendMessage} from "../ai/chat-ai";

const USER = "User";
const BOT = "Bot";

const Chat = ({setData}) => {
  const [chatHistory, setChatHistory] = React.useState([]);
  const [transcript, setTranscript] = React.useState('');
  const [speechToText, setSpeechToText] = React.useState('');
  const [loaderVisible, setLoaderVisibility] = React.useState(false);
  const questionRef = useRef(null);
  
  useEffect(() => {
    setTranscript(speechToText);
    questionRef.current.focus();
  }, [speechToText]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoaderVisibility(true);
    updateChatHistory(USER, questionRef.current.value);
    
    sendMessage(questionRef.current.value)
      .then(response => {
        console.log('the response is', response);
        updateChatHistory(BOT, response);
        setLoaderVisibility(false);
        setData(response);
      });
    
    clearInput(e);
  }
  
  const handleEnter = (e) => {
    if (e.key === 'Enter' && questionRef.current.value !== '') {
      handleSubmit(e);
    }
  };
  
  const clearInput = (e) => {
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
                   inputRef={questionRef}
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
      {loaderVisible && <LinearProgress/>}
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
