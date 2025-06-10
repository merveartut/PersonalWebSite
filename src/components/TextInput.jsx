import React, { useState } from "react";

function TextInput({ label, value, setValue, name }) {
  const [displayLabel, setDisplayLabel] = useState(false);
  const handleFocus = () => setDisplayLabel(true);
  const handleBlur = () => setDisplayLabel(false);
  return (
    <div className="relative">
      <input
        name={name}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={displayLabel ? "" : label}
        onChange={(e) => setValue(e.target.value)}
        className={`
          h-[40px] w-[300px] rounded-[6px] border border-gray-500 
          p-[6px] bg-[#f9f9f9] font-roboto 
          focus:border-thistle focus:outline-none
          placeholder:text-gray-400 placeholder:text-[14px] placeholder:pl-[8px]
        `}
      />
      {displayLabel && (
        <span
          className="
            absolute left-[2px] top-[-14px] bg-transparent
            text-[12px] text-gray-500 px-[4px]
          "
        >
          {label}
        </span>
      )}
    </div>
  );
}

export default TextInput;
