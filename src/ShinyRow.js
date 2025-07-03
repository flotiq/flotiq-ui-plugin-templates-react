import { useCallback, useMemo, useState } from 'react';

function ShinyRow({ data }) {
  const [toggle, setToggle] = useState(false);
  const click = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    setToggle((t) => !t);
  }, []);

  const style = useMemo(
    () => ({
      color: 'rgb(0, 131, 252)',
      cursor: 'pointer',
      fontStyle: toggle ? 'italic' : 'normal',
      fontWeight: toggle ? 'bold' : 'normal',
    }),
    [toggle],
  );

  return (
    <button
      onClick={click}
      style={style}
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}

export default ShinyRow;
