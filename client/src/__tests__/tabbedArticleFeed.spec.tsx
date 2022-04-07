import { render, userEvent, waitFor } from '../test/test-utils'
import { mockArticle, mockUser } from '../test/data/mockData'
import { TabbedArticleFeed } from '../components'
import { ReactElement } from 'react'

// mock out articleContext
jest.mock('../context/articleContext', () => ({
  __esModule: true,
  useArticleContext: jest.fn(() => mockArticle),
  ArticleProvider: ({ children }: { children: ReactElement }) => children
}))

// mock authContext
jest.mock('../context/authContext', () => ({
  __esModule: true,
  useAuthContext: jest.fn(() => mockUser),
  AuthProvider: ({ children }: { children: ReactElement }) => children
}))

describe('TabbedArticleFeed component tests', () => {
  const TabComponentOne = (): ReactElement => <div>Tab Component One</div>
  const TabComponentTwo = (): ReactElement => <div>Tab Component Two</div>

  const titleList = ['tab-title-1', 'tab-title-2']
  const componentList = [<TabComponentOne />, <TabComponentTwo />]

  test('warn if titleList and/or componentList props are not provided', async () => {
    const { getByText, rerender } = await render(
      <TabbedArticleFeed titleList={[]} componentList={[]} />
    )

    expect(
      getByText(/Please provide a tab to render and a component to render/i)
    ).toBeInTheDocument()

    rerender(<TabbedArticleFeed titleList={[]} componentList={componentList} />)
    expect(getByText(/Please provide a tab to render/i)).toBeInTheDocument()

    rerender(<TabbedArticleFeed titleList={titleList} componentList={[]} />)
    expect(getByText(/Please provide a component to render/i)).toBeInTheDocument()

    rerender(<TabbedArticleFeed titleList={titleList} componentList={[<TabComponentOne />]} />)
    expect(getByText(/Please provide equal number of tabs and components/i)).toBeInTheDocument()
  })

  test('clicking tabs should switch between components', async () => {
    const { queryByText, getByText, getByRole } = await render(
      <TabbedArticleFeed titleList={titleList} componentList={componentList} />
    )

    const toggle = () => userEvent.click(getByRole('listitem', { name: 'tab' }))

    expect(getByRole('listitem', { name: 'tab' })).toHaveTextContent(/tab-title-2/i)
    expect(getByRole('listitem', { name: 'active-tab' })).toHaveTextContent(/tab-title-1/i)
    expect(getByText(/tab component one/i)).toBeInTheDocument()
    expect(queryByText(/tab component two/i)).not.toBeInTheDocument()

    toggle()

    await waitFor(() =>
      expect(getByRole('listitem', { name: 'tab' })).toHaveTextContent('tab-title-1')
    )

    expect(getByRole('listitem', { name: 'active-tab' })).toHaveTextContent('tab-title-2')
    expect(getByText(/tab component two/i)).toBeInTheDocument()

    expect(queryByText(/tab component one/i)).not.toBeInTheDocument()

    toggle()

    await waitFor(() => {
      expect(getByRole('listitem', { name: 'tab' })).toHaveTextContent(/tab-title-2/i)
      expect(getByRole('listitem', { name: 'active-tab' })).toHaveTextContent(/tab-title-1/i)
      expect(getByText(/tab component one/i)).toBeInTheDocument()
      expect(queryByText(/tab component two/i)).not.toBeInTheDocument()
    })
  })
})
