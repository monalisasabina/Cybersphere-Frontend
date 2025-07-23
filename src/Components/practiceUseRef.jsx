import { useRef } from "react";

function ClickCounterWithRef() {
  const countRef = useRef(0);

  console.log("Rendering with useRef...");

  const handleClick = () => {
    countRef.current += 1;
    alert(`Clicked ${countRef.current} times`);
  };

  return (
    <div>
      <p>Check the console 👇</p>
      <button onClick={handleClick}>Click me (ref)</button>
    </div>
  );
}
