import { ReactElement, ReactNode, useState, useCallback } from 'react'

import {
  Container,
  TabContainer,
  ContentContainer,
  Header,
  Actions,
  Content,
  ActiveTab,
  Tab,
  EmptyStateMessage,
  AnimatedTabSlider
} from './style'

interface Props {
  titleList: string[]
  componentList: ReactElement[]
  children?: ReactNode
}

export default function TabbedArticleFeed({
  children,
  titleList,
  componentList
}: Props): ReactElement {
  const [activeKey, setActiveKey] = useState<number | null>(0)

  const toggle: (eventKey: number) => void = useCallback(
    eventKey => setActiveKey(eventKey === activeKey ? null : eventKey),
    [activeKey]
  )

  return (
    <Container>
      <Header>
        <TabContainer>
          {titleList.map((title, index) =>
            activeKey === index ? (
              <ActiveTab key={index}>{title}</ActiveTab>
            ) : (
              <Tab onClick={() => toggle(index)} key={index}>
                {title}
              </Tab>
            )
          )}
          <AnimatedTabSlider />
        </TabContainer>
        <Actions>{children}</Actions>
      </Header>
      <ContentContainer>
        {componentList !== null ? (
          componentList.map((component, index) => {
            return activeKey === index ? <Content key={index}>{component}</Content> : null
          })
        ) : (
          <EmptyStateMessage>Please provide a component to render</EmptyStateMessage>
        )}
      </ContentContainer>
    </Container>
  )
}
