// styles/loginStyles/loginStyles.styles.ts
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const Wrapper = styled(Box)({
  height: "100vh",
  width: "100vw",
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
  height: 500,
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
    backgroundImage: `url('https://images.unsplash.com/photo-1667746213225-431db3ed8d13?q=80&w=2974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
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


