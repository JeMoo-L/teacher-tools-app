import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import MenuList from '@mui/material/MenuList';
import { useAtomValue, useSetAtom } from 'jotai';
import { RefObject } from 'react';
import * as atoms from '../stores/atoms';
import SessionItem from './SessionItem';

type SessionListProps = { sessionListRef: RefObject<HTMLDivElement | null> };

export default function SessionList({ sessionListRef }: SessionListProps) {
  const sortedSessions = useAtomValue(atoms.sortedSessionsAtom);
  const setSessions = useSetAtom(atoms.sessionsAtom);
  const currentSessionId = useAtomValue(atoms.currentSessionIdAtom);

  const sensors = useSensors(
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 10 } }),
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const onDragEnd = (event: DragEndEvent) => {
    if (!event.over) {
      return;
    }
    const activeId = event.active.id;
    const overId = event.over.id;
    if (activeId !== overId) {
      const oldIndex = sortedSessions.findIndex((s) => s.id === activeId);
      const newIndex = sortedSessions.findIndex((s) => s.id === overId);
      const newReversed = arrayMove(sortedSessions, oldIndex, newIndex);
      setSessions(atoms.sortSessions(newReversed));
    }
  };

  return (
    <MenuList
      sx={{
        width: '100%',
        overflow: 'auto',
        '& ul': { padding: 0 },
        flexGrow: 1,
      }}
      component="div"
      ref={sessionListRef}
    >
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={sortedSessions} strategy={verticalListSortingStrategy}>
          {sortedSessions.map((session, ix) => (
            <SortableItem key={session.id} id={session.id}>
              <SessionItem
                key={session.id}
                selected={currentSessionId === session.id}
                session={session}
              />
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </MenuList>
  );
}

function SortableItem(props: { id: string; children?: React.ReactNode }) {
  const { id, children } = props;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
