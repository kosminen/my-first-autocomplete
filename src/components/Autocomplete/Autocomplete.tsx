import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

function Autocomplete() {
  const [count, setCount] = useState(0);

  return (
    <div className="autocomplete">
      <input type="text" />
      <ul>

      </ul>
    </div>
  );
}

export default Autocomplete;
