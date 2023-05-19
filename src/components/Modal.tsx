import { useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: JSX.Element;
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
}

function Modal(props: ModalProps) {
  const { open, setOpen, children } = props;

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {open && (
        <div className="modal">
          <div className="modal-content" ref={ref}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
