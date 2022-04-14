import { Fragment, ReactElement } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Article } from '../../../types/shared'
import { convertToReadableDate } from '../../../utils/helperFns'
import { Avatar } from '../../../components'
import {
  ArticleTitle,
  ArticleMeta,
  ContentWrapper,
  AuthorName,
  CreatedDate,
  ArticleBody,
  MarkdownContainer
} from './style'

interface Props {
  article: Article
}

export default function ArticlePageCard({ article }: Props): ReactElement {
  return (
    <Fragment>
      <ArticleTitle role="heading" aria-level={1}>
        {article.title}
      </ArticleTitle>

      <ArticleMeta>
        <Avatar user={article.author} />
        <ContentWrapper>
          <AuthorName>{article.author.username}</AuthorName>
          <CreatedDate>{convertToReadableDate(article.createdAt)}</CreatedDate>
        </ContentWrapper>
      </ArticleMeta>

      <ArticleBody>
        <MarkdownContainer>
          <ReactMarkdown
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
        </MarkdownContainer>
      </ArticleBody>
    </Fragment>
  )
}
