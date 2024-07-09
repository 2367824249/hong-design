import React, { } from 'react';
interface GridLayoutProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  count?: number
}
const GridLayout: React.FC<GridLayoutProps> = ({ children, count = 3, ...rest }) => {
  return <div {...rest} style={{ display: 'grid', gridTemplateColumns: `repeat(${count},1fr)` }}>{children}</div>;
};
export default GridLayout;
