import { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import { PageContainer, LayoutWrapper } from '../../styles/shared'
import { convertToReadableDate } from '../../utils/helperFns'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import {
  ArticleTitle,
  ArticleMeta,
  ContentWrapper,
  AuthorName,
  Avatar,
  CreatedDate,
  ArticleBody,
  MarkdownContainer
} from './style'
// import ReactMarkdown from 'react-markdown'

export default function ArticleDetails(): ReactElement {
  const {
    state: { article }
  } = useLocation()

  return (
    <PageContainer>
      <LayoutWrapper>
        <ArticleTitle role="heading" aria-level={1}>
          {article.title}
        </ArticleTitle>

        <ArticleMeta>
          <Avatar src={article.image} />
          <ContentWrapper>
            <AuthorName>{article.author.username}</AuthorName>
            <CreatedDate>{convertToReadableDate(article.createdAt)}</CreatedDate>
          </ContentWrapper>
        </ArticleMeta>

        <ArticleBody>
          <MarkdownContainer
            children={article.body}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code {...props}>{children}</code>
                )
              }
            }}
          />
        </ArticleBody>
      </LayoutWrapper>
    </PageContainer>
  )
}
