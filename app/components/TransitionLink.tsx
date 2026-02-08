"use client";

import { useTransitionNav } from "./TransitionProvider";

export default function TransitionLink({
  href,
  children,
  durationMs = 900,
  style,
  className,
  onMouseEnter,
  onFocus,
}: {
  href: string;
  children: React.ReactNode;
  durationMs?: number;
  style?: React.CSSProperties;
  className?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
  onFocus?: React.FocusEventHandler<HTMLAnchorElement>;
}) {
  const { go } = useTransitionNav();

  return (
    <a
      href={href}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      onClick={(e) => {
        e.preventDefault();
        go(href, { durationMs });
      }}
    >
      {children}
    </a>
  );
}
