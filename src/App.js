
import Box from '@mui/material/Box';
import './App.css';
import ListContainer from './components/ListsContainer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ListProvider from './store/ListProvider';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function App() {
  return (
		<ListProvider>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<Box sx={{ p: 5 }} className="app-container">
					<ListContainer />
				</Box>
			</ThemeProvider>
		</ListProvider>
	);
}

export default App;
