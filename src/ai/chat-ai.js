import testData from './test-data.json';

const headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Authorization", "Bearer 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");

const messageArray = [];
setInitialMessages();

export async function sendMessage(message) {
  messageArray.push(setUserMessage(message)); // Keep adding the message to the array as user message.
  const request = setMessageRequest(messageArray);
  console.log('Message history', messageArray);
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(request),
    redirect: 'follow'
  };
  
  return await fetch("https://api.openai.com/v1/chat/completions", requestOptions)
    .then(response => response.text())
    .then(result => {
      const jsonResult = JSON.parse(result);
      console.log(jsonResult);
      const responseMessage = jsonResult.choices[0].message;
      // add assistant message.
      messageArray.push(setAssistantMessage(JSON.stringify(responseMessage)));
      return responseMessage.content;
    });
}

function setMessageRequest(message) {
  return {
    model: "gpt-3.5-turbo",
    messages: message,
    temperature: 0.1
  };
}

function setInitialMessages() {
  const systemMsg = setSystemMessage("YOU ARE CUSTOM ASSISTANT WITH YOUR KNOWLEDGE LIMITED TO CHAT HISTORY ONLY, YOU DO NOT KNOW ANYTHING OTHER THAN WHAT IS IN THE CHAT HISTORY. ANSWER QUESTIONS ONLY FROM CHAT HISTORY, DO NOT USE ANY OTHER DATA OTHER THAN CHAT HISTORY. PRINT CONTENT IN JSON FORMAT.");
  messageArray.push(systemMsg);
  const usermsg = setUserMessage("I asked you not to use phrase 'chat history' always refer as 'data provided'");
  messageArray.push(usermsg);
  const assistantmsg = setAssistantMessage(JSON.stringify(testData));
  messageArray.push(assistantmsg);
  console.log(messageArray);
  return messageArray;
}

function setUserMessage(message) {
  return {
    "role": "user",
    "content": message
  }
}

function setSystemMessage(message) {
  return {
    "role": "system",
    "content": message
  }
}

function setAssistantMessage(message) {
  return {
    "role": "assistant",
    "content": message
  }
}
