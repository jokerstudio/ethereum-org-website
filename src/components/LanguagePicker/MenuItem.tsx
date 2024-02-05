import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { BsCheck } from "react-icons/bs"
import {
  Badge,
  Box,
  Flex,
  forwardRef,
  Icon,
  MenuItem as ChakraMenuItem,
  type MenuItemProps as ChakraMenuItemProps,
  Text,
} from "@chakra-ui/react"

import type { LocaleDisplayInfo } from "@/lib/types"

import { BaseLink } from "@/components/Link"

import ProgressBar from "./ProgressBar"

type ItemProps = ChakraMenuItemProps & {
  displayInfo: LocaleDisplayInfo
}

const MenuItem = forwardRef(({ displayInfo, ...props }: ItemProps, ref) => {
  const {
    localeOption,
    sourceName,
    targetName,
    approvalProgress,
    wordsApproved,
    isBrowserPreference,
    isBrowserDefault,
  } = displayInfo
  const { t } = useTranslation("page-languages")
  const { asPath, locale } = useRouter()
  const isCurrent = localeOption === locale

  const getProgressInfo = (approvalProgress: number, wordsApproved: number) => {
    const percentage = new Intl.NumberFormat(locale!, {
      style: "percent",
    }).format(approvalProgress / 100)
    const progress =
      approvalProgress === 0 ? "<" + percentage.replace("0", "1") : percentage
    const words = new Intl.NumberFormat(locale!).format(wordsApproved)
    return { progress, words }
  }

  const { progress, words } = getProgressInfo(approvalProgress, wordsApproved)

  return (
    <ChakraMenuItem
      as={BaseLink}
      ref={ref}
      flexDir="column"
      w="full"
      mb="1"
      display="block"
      pt="2 !important"
      alignItems="start"
      borderRadius="base"
      bg="transparent"
      color="body.base"
      textDecoration="none"
      data-group
      onFocus={(e) => {
        e.target.scrollIntoView({ block: "nearest" })
      }}
      scrollMarginY="8"
      _hover={{ bg: "primary.lowContrast", textDecoration: "none" }}
      _focus={{ bg: "primary.lowContrast" }}
      sx={{
        p: {
          textDecoration: "none",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      }}
      href={asPath}
      locale={localeOption}
      {...props}
    >
      <Flex alignItems="center" w="full">
        <Box flex={1}>
          <Flex alignItems="center" gap={2}>
            <Text
              fontSize="lg"
              color={isCurrent ? "primary.highContrast" : "primary.base"}
            >
              {targetName}
            </Text>
            {isBrowserPreference && (
              <Badge
                border="1px"
                borderColor="body.medium"
                color="body.medium"
                lineHeight="none"
                fontSize="2xs"
                p="1"
                h="fit-content"
                bg="none"
              >
                {t(
                  isBrowserDefault
                    ? "page-languages-browser-default"
                    : "page-languages-browser-preference"
                )}
              </Badge>
            )}
          </Flex>
          <Text textTransform="uppercase" fontSize="xs" color="body.base">
            {sourceName}
          </Text>
        </Box>
        {isCurrent && <Icon as={BsCheck} fontSize="2xl" />}
      </Flex>
      <Text
        textTransform="lowercase"
        fontSize="xs"
        color="body.medium"
        maxW="full"
      >
        {progress} {t("page-languages-translated")} • {words}{" "}
        {t("page-languages-words")}
      </Text>
      <ProgressBar value={approvalProgress} isCurrent={isCurrent} />
    </ChakraMenuItem>
  )
})

export default MenuItem
