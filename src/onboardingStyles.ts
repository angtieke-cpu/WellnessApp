import { CSSProperties } from "react";

export const colors = {
  bg: "#a995ae",
  card: "#F7F4F8",
  primary: "rgb(219, 188, 191)",
  primarySoft: "rgb(219, 188, 191)",
  text: "#2B2B2B",
  sub: "#6B6B6B",
  border: "#E2DCE6"
} as const;

/* ===================== Layout ===================== */

export const container: CSSProperties = {
  minHeight: "100vh",
  background: colors.bg,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16
};

export const card: CSSProperties = {
  width: "100%",
  maxWidth: 420,
  background: colors.card,
  borderRadius: 20,
  padding: 24,
  boxShadow: "0 20px 50px rgba(0,0,0,0.08)"
};

/* ===================== Typography ===================== */

export const title: CSSProperties = {
  fontSize: 26,
  fontWeight: 600,
  marginBottom: 8,
  fontFamily: "serif",
  color: colors.text
};

export const subtitle: CSSProperties = {
  fontSize: 14,
  color: colors.sub,
  marginBottom: 16
};

/* ===================== Buttons ===================== */

export const cta: CSSProperties = {
  marginTop: 28,
  width: "100%",
  padding: "14px",
  borderRadius: 14,
  background: "rgba(221, 182, 184)",
  border: "none",
  color: "#ffffff",
  fontSize: 16,
  fontWeight: 500,
  cursor: "pointer"
};

export const optionBtn: CSSProperties = {
  padding: "16px 12px",
  borderRadius: 16,
  border: `1px solid ${colors.border}`
};

/* ===================== Inputs ===================== */

export const input: CSSProperties = {
  width: "100%",
  padding: 14,
  borderRadius: 14,
  border: `1px solid ${colors.border}`,
  fontSize: 15,
  outline: "none",
  marginTop: 20
};
