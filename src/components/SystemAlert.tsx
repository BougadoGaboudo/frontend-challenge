import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
import { Lock } from "@mui/icons-material";

export default function SystemAlert() {
  return (
    <Alert
      severity="warning"
      sx={{
        px: "2rem",
        py: "2rem",
        my: "4rem",
        backgroundColor: "#FFF2BF",
        border: "2px solid #FFCC00",
        borderRadius: "1rem",
        "& .MuiAlert-icon": {
          color: "#856404",
        },
        "& .MuiAlert-action": {
          display: "flex",
          alignItems: "center",
        },
      }}
      icon={
        <Box
          sx={{
            backgroundColor: "#FFF",
            borderRadius: "50%",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Lock sx={{ color: "#FFCC00" }} />
        </Box>
      }
      action={
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#FFCC00",
            color: "black",
            fontWeight: "bold",
            borderRadius: "0.25rem",
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          }}
        >
          CONFIGURER MON CODE
        </Button>
      }
    >
      <AlertTitle
        variant="h6"
        sx={{ marginLeft: "1rem", fontWeight: "bold", color: "black" }}
      >
        Votre Code PIN n'est pas configuré
      </AlertTitle>
      <Typography sx={{ marginLeft: "1rem", color: "black" }}>
        Activez-le pour sécuriser la récupération des cadeaux par vos clients.
      </Typography>
    </Alert>
  );
}
