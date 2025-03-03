import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import {
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useAtom } from 'jotai';
import { PanelLeftClose } from 'lucide-react';
import { useRef } from 'react';
import SessionList from './components/SessionList';
import icon from './static/icon.png';
import { settingsAtom } from './stores/atoms';
import * as sessionActions from './stores/sessionActions';

export const drawerWidth = 240;

export default function Sidebar({
  openCopilotWindow,
  openAboutWindow,
}: // setOpenSettingWindow,
{
  openCopilotWindow: () => void;
  openAboutWindow: () => void;
  // setOpenSettingWindow: (name: 'ai' | 'display' | null) => void;
}) {
  const [settings, setSettings] = useAtom(settingsAtom);

  const sessionListRef = useRef<HTMLDivElement>(null);

  const handleCreateNewSession = () => {
    sessionActions.createEmpty('chat');
    if (sessionListRef.current) {
      sessionListRef.current.scrollTo(0, 0);
    }
    // trackingEvent('create_new_conversation', { event_category: 'user' });
  };

  const theme = useTheme();

  return (
    <div
      className={`fixed top-0 left-0 h-full z-50 transition-transform duration-230 ${
        settings.showSidebar ? 'translate-x-0' : '-translate-x-[250px]'
      }`}
      style={{
        boxSizing: 'border-box',
        width: drawerWidth,
        borderRightWidth: '1px',
        borderRightStyle: 'solid',
        borderRightColor: theme.palette.divider,
      }}
    >
      <div className="ToolBar h-full">
        <Stack
          className="pt-3 pl-2 pr-1"
          sx={{
            height: '100%',
          }}
        >
          <Box className="flex justify-between items-center px-2">
            <Box>
              <a
                href="https://github.com/Bin-Huang/chatbox"
                target="_blank"
                className="flex items-center no-underline"
              >
                <img src={icon} className="w-6 h-6 mr-2" />
                <span className="text-xl font-semibold opacity-75 align-middle inline-block">
                  Chatbox
                </span>
              </a>
            </Box>
            <Box>
              <IconButton
                onClick={() => {
                  setSettings((prev) => ({ ...prev, showSidebar: false }));
                }}
              >
                <PanelLeftClose size={20} strokeWidth={1.5} />
              </IconButton>
            </Box>
          </Box>

          <SessionList sessionListRef={sessionListRef} />

          <Divider variant="fullWidth" />

          <MenuList sx={{ marginBottom: '20px' }}>
            <MenuItem
              onClick={handleCreateNewSession}
              sx={{ padding: '0.2rem 0.1rem', margin: '0.1rem' }}
            >
              <ListItemIcon>
                <IconButton>
                  <AddIcon fontSize="small" />
                </IconButton>
              </ListItemIcon>
              <ListItemText>新对话</ListItemText>
              <Typography variant="body2" color="text.secondary">
                {/* ⌘N */}
              </Typography>
            </MenuItem>

            <MenuItem
              onClick={openCopilotWindow}
              sx={{ padding: '0.2rem 0.1rem', margin: '0.1rem' }}
            >
              <ListItemIcon>
                <IconButton>
                  <SmartToyIcon fontSize="small" />
                </IconButton>
              </ListItemIcon>
              <ListItemText>
                <Typography>我的搭档</Typography>
              </ListItemText>
            </MenuItem>

            <MenuItem
              onClick={() => {
                // props.setOpenSettingWindow('ai');
              }}
              sx={{ padding: '0.2rem 0.1rem', margin: '0.1rem' }}
            >
              <ListItemIcon>
                <IconButton>
                  <SettingsIcon fontSize="small" />
                </IconButton>
              </ListItemIcon>
              <ListItemText>设置</ListItemText>
              <Typography variant="body2" color="text.secondary">
                {/* ⌘N */}
              </Typography>
            </MenuItem>

            <MenuItem onClick={openAboutWindow} sx={{ padding: '0.2rem 0.1rem', margin: '0.1rem' }}>
              <ListItemIcon>
                <IconButton>
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </ListItemIcon>
              <ListItemText>
                <Badge
                  color="primary"
                  variant="dot"
                  // invisible={!versionHook.needCheckUpdate}
                  invisible
                  sx={{ paddingRight: '8px' }}
                >
                  <Typography sx={{ opacity: 0.5 }}>
                    关于
                    {/* {/\d/.test(versionHook.version) ? `(${versionHook.version})` : ''} */}
                  </Typography>
                </Badge>
              </ListItemText>
            </MenuItem>
          </MenuList>
        </Stack>
      </div>
    </div>
  );
}
