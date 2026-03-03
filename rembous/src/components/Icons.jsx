function Icon({ children, className = "", size = 18 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function HomeIcon(props) {
  return (
    <Icon {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </Icon>
  );
}

export function RefundIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4 4h16v16H4z" />
      <path d="M8 9h8" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
    </Icon>
  );
}

export function TrackIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Icon>
  );
}

export function ContactIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4 5h16v14H4z" />
      <path d="m4 7 8 6 8-6" />
    </Icon>
  );
}

export function WarningIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 3 2 20h20L12 3z" />
      <path d="M12 9v5" />
      <path d="M12 18h.01" />
    </Icon>
  );
}

export function ShieldIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
      <path d="m9 12 2 2 4-4" />
    </Icon>
  );
}

export function CheckIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.2 2.2 4.8-4.8" />
    </Icon>
  );
}

export function FileIcon(props) {
  return (
    <Icon {...props}>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5" />
      <path d="M10 13h6" />
      <path d="M10 17h6" />
    </Icon>
  );
}

export function LockIcon(props) {
  return (
    <Icon {...props}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 1 1 8 0v3" />
    </Icon>
  );
}

export function PhoneIcon(props) {
  return (
    <Icon {...props}>
      <path d="M22 16.8v2a2 2 0 0 1-2.2 2 19.6 19.6 0 0 1-8.5-3 19.3 19.3 0 0 1-6-6A19.6 19.6 0 0 1 2.2 3.3 2 2 0 0 1 4.2 1h2a2 2 0 0 1 2 1.7c.1.8.3 1.5.6 2.2a2 2 0 0 1-.4 2.1L7.5 8a16 16 0 0 0 6.5 6.5l1-.9a2 2 0 0 1 2.1-.4c.7.3 1.4.5 2.2.6a2 2 0 0 1 1.7 2z" />
    </Icon>
  );
}

export function MailIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4 5h16v14H4z" />
      <path d="m4 7 8 6 8-6" />
    </Icon>
  );
}

export function MenuIcon(props) {
  return (
    <Icon {...props}>
      <path d="M3 6h18" />
      <path d="M3 12h18" />
      <path d="M3 18h18" />
    </Icon>
  );
}

export function CloseIcon(props) {
  return (
    <Icon {...props}>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </Icon>
  );
}
