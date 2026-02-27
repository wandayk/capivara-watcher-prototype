import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { ROUTES } from './utils/constants'
import { ProtectedRoute } from './components/common/ProtectedRoute'

// Pages
import { Login } from './pages/Login'
import { CreateAccount } from './pages/CreateAccount'
import { ChangePassword } from './pages/ChangePassword'
import { Home } from './pages/Home'
import { AddParlamentar } from './pages/AddParlamentar'

function LogoutHandler() {
  const { logout } = useAuth()
  logout()
  return <Navigate to={ROUTES.login} replace />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.createAccount} element={<CreateAccount />} />
        <Route path={ROUTES.changePassword} element={<ChangePassword />} />

        {/* Protected Routes */}
        <Route
          path={ROUTES.home}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.add}
          element={
            <ProtectedRoute>
              <AddParlamentar />
            </ProtectedRoute>
          }
        />

        {/* Logout Route */}
        <Route path={ROUTES.logout} element={<LogoutHandler />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTES.login} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
