// Libraries
import React from "react"
import styled from "styled-components"

// Components
import Breadcrumbs from "../../../components/Breadcrumbs"
import Translation from "../../../components/Translation"
import {
  Content,
  ListItem,
  Page,
} from "../../../components/SharedStyledComponents"

// Data
import allTimeData from "../../../data/translation-reports/alltime-data.json"

// Styles
const HorizontalUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-template-columns: 1fr 1fr;
  }
`

const Contributors = ({ location }) => {
  return (
    <Page>
      <Content>
        <Breadcrumbs slug={location.pathname} />
        <h1>
          <Translation id="page-contributing-translation-program-contributors-title" />
        </h1>
        <h2>
          <Translation id="page-contributing-translation-program-contributors-thank-you" />
        </h2>
        <HorizontalUl>
          {allTimeData.data
            .filter(
              (item) =>
                item.user.username !== "ethdotorg" &&
                !item.user.username.includes("LQS") &&
                !item.user.username.includes("REMOVED_USER")
            )
            .map(({ user }) => user.username)
            .sort((user1, user2) =>
              user1.toLowerCase().localeCompare(user2.toLowerCase())
            )
            .map((user) => {
              return <ListItem>{user}</ListItem>
            })}
        </HorizontalUl>
      </Content>
    </Page>
  )
}
export default Contributors
