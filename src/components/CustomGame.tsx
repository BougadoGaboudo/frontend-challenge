import {
  Box,
  Typography,
  Collapse,
  IconButton,
  Button,
  TextField,
} from "@mui/material";

import {
  FileUpload,
  ExpandMore,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useRef, useState, type DragEvent } from "react";
import type { Colors, Profile } from "../types/CampaignType";
import { useFormContext } from "react-hook-form";

interface CustomGameProps {
  profile: Profile;
  colors: Colors;
  onColorsChange: (colors: Colors) => void;
}

export default function CustomGame({
  profile,
  colors,
  onColorsChange,
}: CustomGameProps) {
  const [open, setOpen] = useState(true);
  const isBasic = profile === "BASIC";

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { setValue } = useFormContext();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      setValue("logo", file);
      console.log("Fichier sélectionné:", file);
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      setValue("logo", file);
      console.log("Fichier déposé via drag & drop:", file);
    }
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  return (
    <Box>
      <Box
        sx={(theme) => ({
          borderLeft: `0.75rem solid ${theme.palette.primary.main}`,
          borderTopLeftRadius: "0.25rem",
          borderBottomLeftRadius: "0.25rem",
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        })}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            PERSONNALISEZ VOTRE JEU
          </Typography>
          <Typography sx={{ maxWidth: "45rem" }}>
            Importez votre logo et sélectionnez vos couleurs pour créer un jeu à
            l'image de votre marque. Offrez à vos clients une expérience unique,
            entièrement personnalisée.
          </Typography>
        </Box>
        <IconButton
          onClick={() => setOpen(!open)}
          color="primary"
          sx={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <ExpandMore />
        </IconButton>
      </Box>

      <Collapse in={open}>
        <Box
          sx={{
            border: "1px solid #E0E0E0",
            borderRadius: "0.5rem",
            p: 5,
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Box
              sx={(theme) => ({
                borderLeft: `0.75rem solid ${theme.palette.primary.main}`,
                borderTopLeftRadius: "0.25rem",
                borderBottomLeftRadius: "0.25rem",
                p: 2,
                mb: 2,
              })}
            >
              <Typography>Glissez-déposez votre logo</Typography>
            </Box>
            <Box
              sx={{
                border: "2px dashed #E0E0E0",
                borderRadius: "0.5rem",
                width: "40rem",
                height: "24rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
              }}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragOver}
              onDragLeave={(e) => e.preventDefault()}
            >
              <Box
                sx={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                  backgroundColor: "#D0D0D0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FileUpload
                  sx={{
                    color: "#F0F0F0",
                    fontSize: 32,
                  }}
                />
              </Box>
              <Button variant="contained" size="large">
                Sélectionner un fichier
              </Button>

              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </Box>
          </Box>

          <Box>
            <Box
              sx={(theme) => ({
                borderLeft: `0.75rem solid ${theme.palette.primary.main}`,
                borderTopLeftRadius: "0.25rem",
                borderBottomLeftRadius: "0.25rem",
                p: 2,
                mb: 2,
              })}
            >
              <Typography>Importez vos couleurs</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 8, mx: 4 }}>
              {/* Couleur primaire */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    mt: 4,
                    mb: 2,
                    width: "5rem",
                    height: "12rem",
                    backgroundColor: colors.primary,
                    borderRadius: "3rem",
                    border: "0.5rem solid #E0E0E0",
                  }}
                />
                <TextField
                  variant="outlined"
                  value={colors.primary}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                      onColorsChange({
                        ...colors,
                        primary: val,
                      });
                    }
                  }}
                  disabled={isBasic}
                  inputProps={{
                    maxLength: 7,
                    style: { textAlign: "center" },
                  }}
                  sx={{
                    width: "6.5rem",
                    borderColor: "#E0E0E0",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: "0.5rem",
                      },
                      "& input": {
                        padding: "0.5rem 1rem",
                      },
                    },
                  }}
                />
              </Box>

              {/* Couleur secondaire */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    mt: 4,
                    mb: 2,
                    width: "5rem",
                    height: "12rem",
                    backgroundColor: colors.secondary,
                    borderRadius: "3rem",
                    border: "0.5rem solid #E0E0E0",
                  }}
                />
                <TextField
                  variant="outlined"
                  value={colors.secondary}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                      onColorsChange({
                        ...colors,
                        secondary: val,
                      });
                    }
                  }}
                  disabled={isBasic}
                  inputProps={{
                    maxLength: 7,
                    style: { textAlign: "center" },
                  }}
                  sx={{
                    width: "6.5rem",
                    borderColor: "#E0E0E0",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: "0.5rem",
                      },
                      "& input": {
                        padding: "0.5rem 1rem",
                      },
                    },
                  }}
                />
              </Box>
            </Box>
            <Typography sx={{ color: "grey", mx: 4, maxWidth: "15rem", my: 2 }}>
              Personnalisez votre jeu en ajoutant jusqu'à deux couleurs.
            </Typography>
          </Box>
          <Button
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              textDecoration: "underline",
            }}
            endIcon={<VisibilityOutlined />}
          >
            Voir l'aperçu
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
}
