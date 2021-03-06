import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import { createClient } from "@supabase/supabase-js";
import React from "react";
import appConfig from "../config.json";
import Header from "../components/Header";
import MessageList from "../components/MessageList";
import Loader from "../components/Loader/Loader";
import { useRouter } from "next/router";
import { ButtonSendSticker } from "../components/ButtonSendSticker";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzY2NTQ2NCwiZXhwIjoxOTU5MjQxNDY0fQ.NIQ1qNBFJHt1cezKBVEt4R-9JCP8kNAXZ_VxMiEfXBw";

const SUPABASE_URL = "https://qqarzpnoemuvcxidecmf.supabase.co";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
  const router = useRouter();
  const loggedUser = router.query.username;

  const [message, setMessage] = React.useState();
  const [messageList, setMessageList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  let messageWithoutSpaces;

  if (typeof message !== "undefined" && message.replace(/\s/g, "").length) {
    messageWithoutSpaces = false;
  } else {
    messageWithoutSpaces = true;
  }

  function handleMessage(event, message) {
    if (
      event.key === "Enter" ||
      event.type === "submit" ||
      event === "sticker"
    ) {
      supabaseClient
        .from("uaicord_messages")
        .insert([{ from: loggedUser, text: message }])
        .order("id", { ascending: false })
        .then(setMessage(""));
    }
  }

  React.useEffect(() => {
    const realTimeDatabase = supabaseClient
      .from("uaicord_messages")
      .on("INSERT", (newMessage) => {
        setMessageList((messageList) => {
          return [newMessage.new, ...messageList];
        });
      })
      .subscribe();
    return () => {
      realTimeDatabase.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    supabaseClient
      .from("uaicord_messages")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        setMessageList(data);
        setIsLoading(!isLoading);
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
          {isLoading ? <Loader /> : <MessageList list={messageList} />}

          <Box
            as="form"
            onSubmit={(event) => {
              event.preventDefault();
              handleMessage(event, message);
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
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  // Verifica????o se a mensagem s?? tem espa??os ou ?? vazia => REGEX
                  if (message.replace(/\s/g, "").length) {
                    handleMessage(event, message);
                  }
                }
              }}
              value={message}
              onChange={(event) => {
                setMessage(event.currentTarget.value);
              }}
            />

            <ButtonSendSticker
              onStickerClick={(event) => {
                const stickerMessage = ":URL:" + event;
                handleMessage("sticker", stickerMessage);
              }}
            />
            <Button
              type="submit"
              styleSheet={{
                minWidth: "50px",
                minHeight: "50px",
                fontSize: "20px",
                marginBottom: "8px",
                marginRight: "8px",
                lineHeight: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: appConfig.theme.colors.neutrals[300],
              }}
              label="Send"
              disabled={messageWithoutSpaces}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
