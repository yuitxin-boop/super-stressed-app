import { useRef } from "react";

function ChatForm({ setChatHistory, generateBotResponse }) {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    inputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      { sender: "user", text: userMessage },
    ]);

    generateBotResponse(userMessage);
  };

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type your message..."
        className="message-input"
        required
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatForm;