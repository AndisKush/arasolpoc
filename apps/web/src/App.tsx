import { BrowserRouter } from 'react-router-dom';
import { OrionProvider } from '@andisds/ui';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes';

function App() {
  return (
    <OrionProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </OrionProvider>
  );
}

export default App;
