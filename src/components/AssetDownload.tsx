import React from "react"
import styled from "@emotion/styled"
import { GatsbyImage } from "gatsby-plugin-image"

import Translation from "../components/Translation"
import ButtonLink from "./ButtonLink"
import Emoji from "./OldEmoji"
import Link from "./Link"
import { Box, Container, Img, Center, Heading } from "@chakra-ui/react"

import { getImage, getSrc, ImageDataLike } from "../utils/image"

export interface IHide {
  shouldHide: boolean
}

export interface IPropsBase {
  children?: React.ReactNode
  alt: string
  artistName?: string
  artistUrl?: string
  src?: string
  shouldHide?: boolean
  title: string
}

interface IPropsWithSVG extends IPropsBase {
  svg: React.FC<React.SVGProps<SVGSVGElement> & { alt: string }>
  image?: never
}
interface IPropsWithImage extends IPropsBase {
  svg?: never
  image: ImageDataLike | null
}

export type IProps = IPropsWithImage | IPropsWithSVG

const ArtistSubtitle = styled.div`
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.m};
  color: ${(props) => props.theme.colors.text300};
  margin-right: 0.5rem;
`

const Caption = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
  width: 100%;
  background: ${(props) => props.theme.colors.background};
  border-left: 1px solid ${(props) => props.theme.colors.white700};
  border-bottom: 1px solid ${(props) => props.theme.colors.white700};
  border-right: 1px solid ${(props) => props.theme.colors.white700};
  border-radius: 0px 0px 4px 4px;
  padding: 0.5rem 1rem;
`

const ButtonContainer = styled.div`
  margin-top: 1rem;
`

// TODO add ability to download SVGs
const AssetDownload: React.FC<IProps> = ({
  alt,
  artistName,
  artistUrl,
  children,
  image,
  src,
  shouldHide = false,
  title,
  svg,
}) => {
  const baseUrl = `https://ethereum.org`
  const downloadUri = src ? src : image ? getSrc(image) : ""
  const downloadUrl = `${baseUrl}${downloadUri}`
  const Svg = svg

  return (
    <Container
      display={{
        base: "flex",
        lg: `${(props) => (props.shouldHide ? `none` : `flex`)}`,
      }}
      maxWidth="100%"
      flex="1 1 45%"
      flexDirection="column"
      justifyContent="space-between"
      margin="4"
      padding="0"
      opacity={(props) => (props.shouldHide ? 0 : 1)}
      shouldHide={shouldHide}
    >
      <Heading as="h4" size="md" fontWeight="500">
        {title}
      </Heading>
      <Box>
        {children && <ImageContainer>{children}</ImageContainer>}
        {!children && (
          <Center border="1px" borderColor="white.700" padding={8}>
            {Svg && <Svg alt={alt} />}
            {image && (
              <Img
                as={GatsbyImage}
                image={getImage(image)!}
                alt={alt}
                width="100%"
                alignSelf="center"
              />
            )}
          </Center>
        )}
        {artistName && (
          <Caption>
            <ArtistSubtitle>
              <Emoji text=":artist_palette:" mr={`0.5em`} />
              <Translation id="page-assets-download-artist" />
            </ArtistSubtitle>
            {artistUrl && <Link to={artistUrl}>{artistName}</Link>}
            {!artistUrl && <span>{artistName}</span>}
          </Caption>
        )}
      </Box>
      <ButtonContainer>
        {!Svg && (
          <ButtonLink to={downloadUrl}>
            <Translation id="page-assets-download-download" />
          </ButtonLink>
        )}
      </ButtonContainer>
    </Container>
  )
}

export default AssetDownload
