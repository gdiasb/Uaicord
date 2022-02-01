import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import { createClient } from "@supabase/supabase-js";
import React from "react";
import appConfig from "../config.json";
import Header from "../components/Header";
import MessageList from "../components/MessageList";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzY2NTQ2NCwiZXhwIjoxOTU5MjQxNDY0fQ.NIQ1qNBFJHt1cezKBVEt4R-9JCP8kNAXZ_VxMiEfXBw";

const SUPABASE_URL = "https://qqarzpnoemuvcxidecmf.supabase.co";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
  const [message, setMessage] = React.useState();
  const [messageList, setMessageList] = React.useState([]);

  function handleMessage(event) {
    if (event.key === "Enter" || event.type === "submit") {
      event.preventDefault();

      supabaseClient
        .from("uaicord_messages")
        .insert([{ from: "PQ", text: event.target.value }])
        .then((item) => {
          setMessageList([...messageList, item.data[0]]);
        });
      setMessage("");
    }
    // } else if (event.type === "submit") {
    //   event.preventDefault();
    //   setMessageList([
    //     ...messageList,
    //     { id: messageList.length + 1, from: "", text: message },
    //   ]);
    //   setMessage("");
    // }
    }
    // console.log(messageList)

  //   function handleMessage(event) {
  //     if (event.key === "Enter") {
  //       event.preventDefault();

  //       const newMessage = {
  //         id: messageList.length + 1,
  //         user: "",
  //         text: event.target.value,
  //       };

  //       setMessageList([...messageList, newMessage]);
  //     //   setMessage("");
  //       event.target.value = "";
  //     }
  //   }

  React.useEffect(() => {
    supabaseClient
      .from("uaicord_messages")
      .select("*")
      .then(({ data }) => {
        setMessageList(data);
      });
  }, []);

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: appConfig.images.background,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95vw",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList list={messageList} />

          <Box
            as="form"
            onSubmit={(event) => {
              handleMessage(event);
            }}
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              placeholder="Say something..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
              onKeyPress={handleMessage}
              value={message}
              onChange={(event) => {
                setMessage(event.currentTarget.value);
              }}
            />

            <Button type="submit" styleSheet={{ height: "90%" }} label="Send" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
