import { SxProps, Theme } from "@mui/material/styles";

export const dashboardContainer: SxProps<Theme> = {
  padding: "2rem",
};

export const sectionTitle: SxProps<Theme> = {
  fontWeight: "bold",
  marginTop: "2rem",
  textAlign: "center",
};

export const loadingText: SxProps<Theme> = {
  textAlign: "center",
  fontSize: "1.2rem",
  color: "primary.main",
  marginTop: "1rem",
};

export const errorText: SxProps<Theme> = {
  textAlign: "center",
  fontSize: "1.2rem",
  color: "error.main",
  marginTop: "1rem",
};

export const spinnerContainer: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "50vh",
};

export const userCardContainer: SxProps<Theme> = {
  display: "grid",
  justifyContent: "center",
  gap: "2rem", // spacing between cards vertically and horizontally
  mt: 2,
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  maxWidth: "1000px",
  margin: "0 auto",
};

export const userCard: SxProps<Theme> = {
  boxShadow: 3,
  borderRadius: 2,
  padding: "1rem",
  width: "100%",
  maxWidth: "320px",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: 6,
  },
};
