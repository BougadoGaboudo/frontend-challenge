import type { ActionType } from "../types/CampaignType";
import { useFormContext } from "react-hook-form";
import type { CampaignFormValues } from "./CampaignForm";
import {
  Add,
  Google,
  Group,
  Instagram,
  Facebook,
  Movie,
  Warning,
  DeleteOutline,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  MenuItem,
  Menu,
} from "@mui/material";
import { useState } from "react";

export default function CampaignAction() {
  const { setValue, watch } = useFormContext<CampaignFormValues>();
  const actions = watch("actions");

  const actionMetaByType: Record<
    ActionType | "PARRAINAGE",
    { label: string; icon: React.ReactNode }
  > = {
    INSTAGRAM: {
      label: "Post Instagram",
      icon: <Instagram />,
    },
    GOOGLE_REVIEW: {
      label: "Avis Google",
      icon: <Google />,
    },
    TIKTOK: {
      label: "Vidéo TikTok",
      icon: <Movie />,
    },
    FACEBOOK: {
      label: "Post Facebook",
      icon: <Facebook />,
    },
    PARRAINAGE: {
      label: "Parrainage (Par défaut)",
      icon: <Group />,
    },
  };

  const getOrderLabel = (index: number, total: number) => {
    const labels = [
      "Première action",
      "Deuxième action",
      "Troisième action",
      "Quatrième action",
      "Cinquième action",
    ];

    if (index === total - 1) return "Dernière action";
    return labels[index];
  };

  const availableTypes: { type: ActionType; label: string }[] = [
    { type: "INSTAGRAM", label: "Post Instagram" },
    { type: "GOOGLE_REVIEW", label: "Avis Google" },
    { type: "TIKTOK", label: "Vidéo TikTok" },
    { type: "FACEBOOK", label: "Post Facebook" },
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const usedTypes = actions.map((a) => a.type);
  const remainingTypes = availableTypes.filter(
    (t) => !usedTypes.includes(t.type)
  );

  const handleDeleteAction = (id: string) => {
    setValue(
      "actions",
      actions.filter((a) => a.id !== id)
    );
  };

  return (
    <>
      <Box>
        <Box
          sx={(theme) => ({
            borderLeft: `0.75rem solid ${theme.palette.primary.main}`,
            borderTopLeftRadius: "0.25rem",
            borderBottomLeftRadius: "0.25rem",
            p: 2,
            mb: 4,
          })}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                ORGANISEZ VOS ACTIONS
              </Typography>
              <Typography>
                Définissez l'ordre et les actions à réaliser par vos clients
                pour maximiser l'engagement.
              </Typography>
            </Box>
            <Button
              variant="contained"
              endIcon={<Add />}
              size="large"
              sx={{
                backgroundColor: "primary.main",
                borderRadius: "0.5rem",
                fontWeight: "normal",
                textTransform: "none",
                padding: "0.5rem 1.5rem",
              }}
              disableElevation
              onClick={handleOpenMenu}
            >
              Ajouter une action
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              {remainingTypes.length > 0 ? (
                remainingTypes.map((item) => (
                  <MenuItem
                    key={item.type}
                    onClick={() => {
                      setValue("actions", [
                        ...actions,
                        {
                          id: crypto.randomUUID(),
                          priority: actions.length + 1,
                          type: item.type,
                          target: `https://${item.type.toLowerCase()}.com`,
                        },
                      ]);
                      handleCloseMenu();
                    }}
                  >
                    {actionMetaByType[item.type].icon}
                    <Typography ml={1}>
                      {actionMetaByType[item.type].label}
                    </Typography>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  Toutes les actions ont été ajoutées
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Box>

        <TableContainer
          sx={{
            border: "1px solid #E0E0E0",
            borderRadius: "0.5rem",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ borderRight: "1px solid #E0E0E0", fontWeight: "bold" }}
                >
                  Ordre des actions
                </TableCell>
                <TableCell
                  sx={{ borderRight: "1px solid #E0E0E0", fontWeight: "bold" }}
                >
                  Action
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Cible</TableCell>
                <TableCell width={50}></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* Actions utilisateur */}
              {actions.map((action, index) => (
                <TableRow key={action.id}>
                  <TableCell sx={{ borderRight: "1px solid #E0E0E0" }}>
                    {getOrderLabel(index, actions.length + 2)}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #E0E0E0" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Icon>{actionMetaByType[action.type].icon}</Icon>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {actionMetaByType[action.type].label}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid #E0E0E0" }}>
                    <Typography color="grey">{action.target}</Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      sx={{ color: "black" }}
                      onClick={() => handleDeleteAction(action.id)}
                    >
                      <DeleteOutline />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {/* Parrainage (Par défaut) */}
              <TableRow>
                <TableCell>
                  {getOrderLabel(actions.length + 1, actions.length + 2)}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Icon>{actionMetaByType.PARRAINAGE.icon}</Icon>
                    <Typography fontWeight="bold">
                      {actionMetaByType.PARRAINAGE.label}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            borderLeft: "0.75rem solid #FFCC00",
            borderTopLeftRadius: "0.25rem",
            borderBottomLeftRadius: "0.25rem",
            mt: 2,
          }}
        >
          <Typography
            color="secondary"
            sx={{ bgcolor: "#FFF2BF", ml: 1, py: 1, px: 2 }}
          >
            <Icon sx={{ mr: 1 }}>
              <Warning />
            </Icon>
            Une seule action = une seule participation
            <br />
            Vos clients ne joueront qu'une seule fois si vous ne proposez qu'une
            seule action.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
