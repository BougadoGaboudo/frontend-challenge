import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Typography,
  Modal,
} from "@mui/material";
import { QrCode, MoreVert } from "@mui/icons-material";
import { useState } from "react";

interface HeaderProps {
  onSaveClick: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Header({ onSaveClick }: HeaderProps) {
  const [modalType, setModalType] = useState<null | "pin" | "qr">(null);
  const handleClose = () => setModalType(null);

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
                onClick={() => setModalType("pin")}
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
                onClick={() => setModalType("qr")}
              >
                QR Code
              </Button>
              <Modal open={modalType !== null} onClose={handleClose}>
                <Box sx={style}>
                  <Typography>
                    {modalType === "pin" ? "Mon Code PIN" : "QR Code"}
                  </Typography>
                </Box>
              </Modal>
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
