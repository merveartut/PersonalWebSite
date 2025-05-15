import React, { useState } from "react";
import styles from "./TextInput.module.css";

function TextInput({ label, value, setValue, name }) {
  const [displayLabel, setDisplayLabel] = useState(false);
  const handleFocus = () => setDisplayLabel(true);
  const handleBlur = () => setDisplayLabel(false);
  return (
    <div className={styles.main}>
      <input
        className="h-[60px]"
        name={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={displayLabel ? null : label}
        onChange={(e) => setValue(e)}
      ></input>
      {displayLabel ? <span className={styles.fill}>{label}</span> : null}
    </div>
  );
}

export default TextInput;
