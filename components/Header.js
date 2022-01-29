import { Box, Text, Button } from "@skynexui/components";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading4">Prosa</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          onClick={() => router.push('/')}
        />
      </Box>
    </>
  );
}
