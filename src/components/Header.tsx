import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { QrCode, MoreVert } from "@mui/icons-material";

interface HeaderProps {
  onSaveClick: () => void;
}

export default function Header({ onSaveClick }: HeaderProps) {
  return (
    <header>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "var(--light-grey)",
          justifyContent: "center",
          px: "2rem",
          py: "1rem",
        }}
        elevation={0}
      >
        <Toolbar sx={{ p: 0 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              maxWidth: "92rem",
              mx: "auto",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                color="primary"
                variant="h3"
                sx={{ fontWeight: "bold" }}
              >
                Ma Campagne
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
                mt: { xs: 2, sm: 0 },
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  color: "black",
                  backgroundColor: "#fff",
                  borderLeft: "0.5rem solid #5500A4",
                }}
              >
                Mon Code PIN
              </Button>
              <Button
                variant="contained"
                startIcon={<QrCode />}
                sx={{
                  color: "#fff",
                  backgroundColor: "secondary.main",
                  boxShadow: "none",
                  "&:hover": { boxShadow: "none" },
                }}
              >
                QR Code
              </Button>
              <Button
                variant="contained"
                sx={{
                  color: "#fff",
                  backgroundColor: "primary.main",
                  boxShadow: "none",
                  "&:hover": { boxShadow: "none" },
                }}
                onClick={onSaveClick}
              >
                SAUVEGARDER
              </Button>
              <IconButton>
                <MoreVert sx={{ transform: "rotate(90deg)" }} />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );
}
