import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import {Button} from "@mui/material";
import {useEffect} from "react";

const SpeechToText = ({setSpeechToText}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  useEffect(() => {
    setSpeechToText(transcript);
  }, [transcript, setSpeechToText]);
  
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  
  return (
    <Button id="speechToText"
            sx={style}
            onClick={listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening}>
      {listening ? 'Listening' : 'Speak'}
    </Button>
  );
};

const style = {
  position: 'absolute',
  right: '22px',
  top: '10px'
}

export default SpeechToText;
