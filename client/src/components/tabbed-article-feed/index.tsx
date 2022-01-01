import { ReactElement, useState, useCallback } from 'react'
import {
  Container,
  TabContainer,
  ContentContainer,
  Content,
  ActiveTab,
  Tab,
  AnimatedTabSlider
} from './style'

interface Props {
  titleList: string[]
  componentList: ReactElement[]
}

export default function TabbedArticleFeed({ titleList, componentList }: Props): ReactElement {
  const [activeKey, setActiveKey] = useState<number | null>(0)

  const toggle: (eventKey: number) => void = useCallback(
    eventKey => setActiveKey(eventKey === activeKey ? null : eventKey),
    [activeKey]
  )

  return (
    <Container>
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
      <ContentContainer>
        {componentList !== null ? (
          componentList.map((component, index) => {
            return activeKey === index ? <Content key={index}>{component}</Content> : null
          })
        ) : (
          <div>Please provide a component to render</div>
        )}
      </ContentContainer>
    </Container>
  )
}
