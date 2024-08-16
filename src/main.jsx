import { createRoot } from 'react-dom/client'
import TodoApp from './TodoApp.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <div className="container">
      <TodoApp />
    </div>
  // </StrictMode>,
)
