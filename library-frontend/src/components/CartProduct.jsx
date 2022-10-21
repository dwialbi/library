import {
  Box,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react"
import * as React from "react"

export const CartProductMeta = (props) => {
  const { image_url, title } = props

  return (
    <Stack direction="row" spacing="5" width="full">
      <Image
        rounded="lg"
        width="120px"
        height="120px"
        fit="cover"
        src={image_url}
        alt={title}
        draggable="false"
        loading="lazy"
      />
      <Box pt="4">
        <Stack spacing="0.5">
          <Text fontWeight="medium">{title}</Text>
        </Stack>
      </Box>
    </Stack>
  )
}
