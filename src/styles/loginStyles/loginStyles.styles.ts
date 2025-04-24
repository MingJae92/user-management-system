import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const Wrapper = styled(Box)({
  height: "100vh", // full viewport height
  width: "100vw",  // full viewport width
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f0f2f5",
  fontFamily: "'Inter', sans-serif",
});

export const ContainerBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  width: "90%",
  maxWidth: 900,
  height: "500px",
  borderRadius: theme.spacing(2),
  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  backgroundColor: "#fff",
}));

export const FormBox = styled(Box)(({ theme }) => ({
  width: "50%",
  padding: theme.spacing(6),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(3),
}));

export const ImageBox = styled(Box)({
  width: "50%",
  height: "100%",
  backgroundImage: `url('https://images.unsplash.com/photo-1640622651243-d80411b72d5e?auto=format&fit=crop&w=900&q=80')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

export const Title = styled(Typography)({
  fontWeight: 700,
  color: "#333",
});

export const Subtitle = styled(Typography)({
  color: "#666",
});
