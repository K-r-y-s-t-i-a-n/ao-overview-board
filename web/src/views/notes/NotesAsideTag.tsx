import { Badge } from '@mantine/core';
import { Tag } from '../../app/interfaces';
import { useEffect, useState } from 'react';
import { useNotesStore } from '../../app/store';

const NotesAsideTag = ({ tag }: { tag: Tag }) => {
  const selectedTagId = useNotesStore((store) => store.selectedTagId);
  const setSelectedTagId = useNotesStore((store) => store.setSelectedTagId);
  const [isSelected, setIsSelected] = useState(false);
  // const [isHovering, setIsHovering] = useState<boolean>(false);

  useEffect(() => {
    selectedTagId === tag.id ? setIsSelected(true) : setIsSelected(false);
  }, [selectedTagId, tag.id]);

  return (
    <Badge
      className="prevent-select"
      mr={5}
      mb={2}
      color={isSelected ? 'lime' : 'gray'}
      // onMouseEnter={() => setIsHovering(true)}
      // onMouseLeave={() => setIsHovering(false)}
      onClick={() => setSelectedTagId(tag.id)}
      // variant={isSelected || isHovering ? 'filled' : 'outline'}
      variant={isSelected ? 'filled' : 'outline'}
      sx={{
        // transition: '0.1s',
        '&:hover': { cursor: 'pointer' },
      }}
    >
      {tag.name}
    </Badge>
  );
};

export default NotesAsideTag;
