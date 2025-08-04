import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
import { Lock } from "@mui/icons-material";

export default function SystemAlert() {
  return (
    <Alert
      severity="warning"
      sx={{
        px: { xs: "1rem", sm: "2rem" },
        py: { xs: "1rem", sm: "2rem" },
        my: { xs: "2rem", sm: "4rem" },
        backgroundColor: "#FFF2BF",
        border: "2px solid #FFCC00",
        borderRadius: "1rem",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        "& .MuiAlert-icon": {
          color: "#856404",
          mr: { xs: 0, sm: "1rem" },
        },
        "& .MuiAlert-action": {
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center" },
          ml: { xs: 0, sm: "auto" },
          p: { xs: 0 },
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
          <Lock
            sx={{
              color: "#FFCC00",
            }}
          />
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
        sx={{
          marginLeft: { xs: "0", sm: "1rem" },
          textAlign: { xs: "center", sm: "left" },
          fontWeight: "bold",
          color: "black",
        }}
      >
        Votre Code PIN n'est pas configuré
      </AlertTitle>
      <Typography
        sx={{
          marginLeft: { xs: "0", sm: "1rem" },
          color: "black",
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        Activez-le pour sécuriser la récupération des cadeaux par vos clients.
      </Typography>
    </Alert>
  );
}
