import { Box } from '@mui/material';
import { useAtom } from 'jotai';
import Header from './components/Header';
import { drawerWidth } from './Sidebar';
import { settingsAtom } from './stores/atoms';

export default function MainPane() {
  // const currentSession = useAtomValue(atoms.currentSessionAtom);

  const [settings, setSettings] = useAtom(settingsAtom);

  return (
    <Box
      className="h-full w-full"
      sx={{
        flexGrow: 1,
        marginLeft: `${settings.showSidebar ? drawerWidth : 0}px`,
      }}
    >
      <div className="flex flex-col h-full">
        <Header />
        {/* <MessageList />
        <InputBox
          currentSessionId={currentSession.id}
          currentSessionType={currentSession.type || 'chat'}
        /> */}
      </div>
    </Box>
  );
}
