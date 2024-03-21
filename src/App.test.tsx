import { describe, test, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { logScreen } from './utils/testUtils'

describe('App', () => {
  test('App render and turn pages', async () => {
    render(<App />, {
      wrapper: BrowserRouter
    })
    const user = userEvent.setup()

    // Verify home page

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe(
        'Trang chủ | Shopee'
      )
    })

    // Verify login page
    await user.click(screen.getByText(/Đăng nhập/i))
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe(
        'Đăng nhập | Shopee'
      )
    })

    screen.debug(document.body.parentElement as HTMLElement, 999999)
  })

  test('Page not found', async () => {
    const badRoute = '/some/bad/route'
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(document.documentElement.textContent).toContain('Page Not Found')
    })

    // await logScreen()
  })
})
