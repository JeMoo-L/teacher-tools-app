import { Typography, useTheme } from '@mui/material';
import { useAtomValue } from 'jotai';
import * as atoms from '../stores/atoms';
import { cn } from '../utils';

interface Props {}

export default function Header(props: Props) {
  const theme = useTheme();
  const currentSession = useAtomValue(atoms.currentSessionAtom);
  // const setChatConfigDialogSession = useSetAtom(atoms.chatConfigDialogAtom);

  // useEffect(() => {
  //   if (currentSession.name === 'Untitled' && currentSession.messages.length >= 2) {
  //     sessionActions.generateName(currentSession.id);
  //     return;
  //   }
  // }, [currentSession.messages.length]);

  // const editCurrentSession = () => {
  //   setChatConfigDialogSession(currentSession);
  // };

  return (
    <div
      className="flex flex-row sm:pl-3 sm:pr-2"
      style={{
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.divider,
      }}
    >
      <div className={cn('w-full mx-auto flex flex-row pt-3 pb-2')}>
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          noWrap
          sx={{
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          className="flex items-center cursor-pointer"
          onClick={() => {
            // editCurrentSession();
          }}
        >
          {
            <Typography variant="h6" noWrap className={cn('max-w-56', 'ml-3')}>
              {currentSession.name}
            </Typography>
          }
        </Typography>
        {/* <Toolbar /> */}
      </div>
    </div>
  );
}
