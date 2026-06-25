import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import FormsPage from './pages/FormsPage'
import ButtonsPage from './pages/ButtonsPage'
import TodoPage from './pages/TodoPage'
import TablePage from './pages/TablePage'
import ModalPage from './pages/ModalPage'
import AlertsPage from './pages/AlertsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forms" element={<FormsPage />} />
          <Route path="buttons" element={<ButtonsPage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="table" element={<TablePage />} />
          <Route path="modal" element={<ModalPage />} />
          <Route path="alerts" element={<AlertsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
