import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import { useSetAtom } from 'jotai';
import React, { useMemo } from 'react';
import { Session } from '../../shared/types';
import * as atoms from '../stores/atoms';
import * as sessionActions from '../stores/sessionActions';
import { cn } from '../utils';

export interface Props {
  session: Session;
  selected: boolean;
}

function _SessionItem({ session, selected }: Props) {
  const setChatConfigDialogSession = useSetAtom(atoms.chatConfigDialogAtom);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const theme = useTheme();
  const medianSize = theme.typography.pxToRem(24);

  const onClick = () => {
    sessionActions.switchCurrentSession(session.id);
  };

  return (
    <>
      <MenuItem
        key={session.id}
        selected={selected}
        onClick={onClick}
        sx={{ padding: '0.1rem', margin: '0.1rem' }}
        className="group/session-item"
      >
        <ListItemIcon>
          <IconButton color={'inherit'} onClick={onClick}>
            {session.picUrl ? (
              <Avatar
                sizes={medianSize}
                sx={{ width: medianSize, height: medianSize }}
                src={session.picUrl}
              />
            ) : (
              <ChatBubbleOutlineOutlinedIcon fontSize="small" />
            )}
          </IconButton>
        </ListItemIcon>
        <ListItemText>
          <Typography variant="inherit" noWrap>
            {session.name}
          </Typography>
        </ListItemText>
        <span
          className={cn(anchorEl ? 'inline-flex' : 'hidden group-hover/session-item:inline-flex')}
        >
          <IconButton onClick={handleMenuClick} sx={{ color: 'primary.main' }}>
            <MoreHorizOutlinedIcon fontSize="small" />
          </IconButton>
        </span>
      </MenuItem>
    </>
  );
}

export default function SessionItem(props: Props) {
  return useMemo(() => {
    return <_SessionItem {...props} />;
  }, [props.session, props.selected]);
}
