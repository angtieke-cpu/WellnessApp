import { theme } from "../theme";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2
        style={{
          color: theme.text,
          fontWeight: 600,
          letterSpacing: "-0.3px",
        }}
      >
        {title}
      </h2>
    </div>
  );
}
