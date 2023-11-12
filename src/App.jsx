import './App.css';
import AuthProvider from './auth/authProvider';
import Routes from './routes/Routes';

function App() {
  return (
    <>
      <AuthProvider>
         <Routes /> 
      </AuthProvider>
    </>
  )
}

export default App;
