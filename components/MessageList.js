import { Box, Text, Image } from "@skynexui/components";
import appConfig from "../config.json";

export default function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: "auto",
        overflowWrap: "break-word",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.list.map((message) => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              flexShrink: 1,
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${message.from}.png`}
              />
              <Text tag="strong">{message.from}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {message.text !== null && message.text.startsWith(":URL:") ? (
              <Image
                src={message.text.replace(":URL:", "")}
                styleSheet={{ height: "30vh" }}
              />
            ) : (
              message.text
            )}
          </Text>
        );
      })}
    </Box>
  );
}
