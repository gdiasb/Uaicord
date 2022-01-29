import { Box, Button, Text, Image } from "@skynexui/components";
import { useRouter } from "next/router";

import appConfig from "../config.json";

export default function Error() {
  const router = useRouter()
  return (
    <>
      <Box
        styleSheet={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.special[404],
          backgroundImage: "url(https://i.im.ge/2022/01/28/Xh4Ajc.jpg)", // DevianArt - @kento1
          color: appConfig.theme.colors.neutrals["050"],
          textAlign: "center",
        }}
      >
        <Box
          styleSheet={{
            width: "90%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Image
            styleSheet={{
              width: {
                xs: "75%",
                sm: "62.5%",
                md: "50%",
                lg: "37.5%",
                xl: "25%",
              },
            }}
            src={`https://i.im.ge/2022/01/28/Xh4Pz0.gif`} // Octodex Github
          />
          <Text variant="display1">404</Text>
          <Text variant="heading2">
            Uai, oncotô? <br />
            Não achei esse trem de página aqui não, sô!
          </Text>

          <Button
            type="button"
            label="É mió voltar pra Home!"
            styleSheet={{ marginTop: "5vh" }}
            onClick={()=> router.push('/')}
          />
        </Box>
      </Box>
    </>
  );
}
