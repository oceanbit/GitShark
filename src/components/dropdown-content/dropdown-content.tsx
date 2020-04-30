import * as React from 'react';

interface DropdownContentProps {
  topLayer: React.ReactNode;
  bottomLayer: React.ReactNode;
  header: React.ReactNode;
  expanded: boolean;
}
export const DropdownContent = ({
  topLayer,
  bottomLayer,
  header,
  expanded,
}: DropdownContentProps) => {
  return (
    <>
      {header}
      {expanded ? topLayer : bottomLayer}
    </>
  );
};
