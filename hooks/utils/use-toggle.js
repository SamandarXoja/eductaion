import { useState } from "react";

const useToggle = (defaultValue = false, onClose) => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const close = () => {
    onClose && onClose();
    setIsOpen(false);
  };

  const open = () => setIsOpen(true);
  const toggle = (e) => {
    setIsOpen((prev) => !prev);
  };

  const set = (value) => setIsOpen(value);

  return { isOpen, close, open, toggle, set };
};

export default useToggle;
