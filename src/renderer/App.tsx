import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid2';
import { ThemeProvider } from '@mui/material/styles';
import { useSetState } from 'ahooks';
import './App.css';
import useAppTheme from './hooks/useAppTheme';
import MainPane from './MainPane';
import Sidebar from './Sidebar';

function Main() {
  const [state, setState] = useSetState<{ openAboutWindow: boolean; openCopilotWindow: boolean }>({
    openAboutWindow: false,
    openCopilotWindow: false,
  });

  return (
    <Box className="box-border App">
      <Grid container className="h-full">
        <Sidebar
          openCopilotWindow={() => setState((state) => ({ ...state, openCopilotWindow: true }))}
          openAboutWindow={() => setState((state) => ({ ...state, openAboutWindow: true }))}
          // setOpenSettingWindow={setOpenSettingWindow}
        />
        <MainPane />
      </Grid>
      {/* <SettingDialog
        open={!!openSettingWindow}
        targetTab={openSettingWindow || undefined}
        close={() => setOpenSettingWindow(null)}
      />
      <AboutWindow open={openAboutWindow} close={() => setOpenAboutWindow(false)} />
      <ChatConfigWindow />
      <CleanWidnow />
      <CopilotWindow open={openCopilotWindow} close={() => setOpenCopilotWindow(false)} />
      <RemoteDialogWindow />
      <Toasts /> */}
    </Box>
  );
}
export default function App() {
  const theme = useAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Main />
    </ThemeProvider>
  );
}
