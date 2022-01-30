import { Box, Text, Image } from "@skynexui/components";
import appConfig from "../config.json";

export default function MessageList({ list }) {
  console.log("MessageList", list);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: "scroll",
        overflowWrap: 'break-word',
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {list.map((message) => {
        return (
          <Text
            // key={mensagem.id}
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
                src={`https://github.com/vanessametonini.png`}
              />
              {/* <Text tag="strong">{mensagem.de}</Text> */} mensagem de
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
            {message}
            {/* {mensagem.texto} */}
          </Text>
        );
      })}
    </Box>
  );
}
