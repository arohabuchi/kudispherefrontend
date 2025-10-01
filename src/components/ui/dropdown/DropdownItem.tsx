import type React from "react";
import { Link } from "react-router-dom";

interface DropdownItemProps {
  tag?: "a" | "button";
  to?: string;
  onClick?: () => void;
  onItemClick?: () => void;
  baseClassName?: string;
  className?: string;
  children: React.ReactNode;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  tag = "button",
  to,
  onClick,
  onItemClick,
  baseClassName = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  className = "",
  children,
}) => {
  const combinedClasses = `${baseClassName} ${className}`.trim();

  const handleClick = (event: React.MouseEvent) => {
    if (tag === "button") {
      event.preventDefault();
    }
    if (onClick) onClick();
    if (onItemClick) onItemClick();
  };

  // ✅ Auto-detect Link if `to` is provided
  if (to) {
    return (
      <Link to={to} className={combinedClasses} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  if (tag === "a") {
    return (
      <a href={to} className={combinedClasses} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={handleClick} className={combinedClasses}>
      {children}
    </button>
  );
};










// import type React from "react";
// import { Link } from "react-router";

// interface DropdownItemProps {
//   tag?: "a" | "button";
//   to?: string;
//   onClick?: () => void;
//   onItemClick?: () => void;
//   baseClassName?: string;
//   className?: string;
//   children: React.ReactNode;
// }

// export const DropdownItem: React.FC<DropdownItemProps> = ({
//   tag = "button",
//   to,
//   onClick,
//   onItemClick,
//   baseClassName = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
//   className = "",
//   children,
// }) => {
//   const combinedClasses = `${baseClassName} ${className}`.trim();

//   const handleClick = (event: React.MouseEvent) => {
//     if (tag === "button") {
//       event.preventDefault();
//     }
//     if (onClick) onClick();
//     if (onItemClick) onItemClick();
//   };

//   if (tag === "a" && to) {
//     return (
//       <Link to={to} className={combinedClasses} onClick={handleClick}>
//         {children}
//       </Link>
//     );
//   }

//   return (
//     <button onClick={handleClick} className={combinedClasses}>
//       {children}
//     </button>
//   );
// };
