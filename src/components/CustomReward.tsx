import type { Gift } from "../types/CampaignType";

import {
  Add,
  ConfirmationNumberOutlined,
  DeleteOutline,
  ExpandMore,
  InfoOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  MenuItem,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import type { CampaignFormValues } from "./CampaignForm";

export default function CustomReward() {
  const { control } = useFormContext<CampaignFormValues>();
  const {
    fields: gifts,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: "gifts",
    keyName: "fieldId",
  });

  const [open, setOpen] = useState(true);
  const [isFullWinning, setIsFullWinning] = useState(true);

  useEffect(() => {
    const hasLoss = gifts.some((g) => g.type === "LOSS");
    const hasUnlimited = gifts.some(
      (g) => g.initial_limit === -1 && g.type !== "LOSS"
    );

    // Si Jeu != 100% gagnant -> Ajouter une perte
    if (!isFullWinning && !hasLoss) {
      append({
        id: crypto.randomUUID(),
        icon: "❌",
        name: "Perdu",
        type: "LOSS",
        initial_limit: -1,
        limit: -1,
      });
    }

    // Si Jeu = 100% gagnant -> Delete la perte
    if (isFullWinning && hasLoss) {
      const lossIndex = gifts.findIndex((g) => g.type === "LOSS");
      if (lossIndex !== -1) remove(lossIndex);
    }

    // Si Jeu = 100% gagnant -> Ajouter un gain illimité obligatoire
    if (isFullWinning && !hasUnlimited) {
      append({
        id: crypto.randomUUID(),
        icon: "🎁",
        name: "Nouveau Gain",
        type: "EAT",
        initial_limit: -1,
        limit: -1,
      });
    }
  }, [isFullWinning, gifts, append, remove]);

  // Activer ou désactiver le statut illimité d'un gain
  const handleToggleUnlimited = (index: number, isUnlimited: boolean) => {
    // Si Jeu = 100% gagnant et qu'on veut désac un gain illimité
    // -> vérif s'il reste au moins un gain illimité
    if (isFullWinning && !isUnlimited) {
      const otherUnlimitedCount = gifts.filter(
        (g, i) => i !== index && g.initial_limit === -1 && g.type !== "LOSS"
      ).length;

      // Si aucun gain illimité restant -> on ne peut pas désactiver le statut illimité
      if (otherUnlimitedCount === 0) {
        return;
      }
    }
    const updatedGift = {
      ...gifts[index],
      limit: isUnlimited ? -1 : 1,
      initial_limit: isUnlimited ? -1 : 1,
    };
    update(index, updatedGift);
  };

  const handleAddGift = () => {
    append({
      id: crypto.randomUUID(),
      icon: "🎁",
      initial_limit: 1,
      limit: 1,
      name: "Nouveau Gain",
      type: "EAT",
    });
  };

  const handleGiftChange = (
    index: number,
    key: keyof Gift,
    value: string | number
  ) => {
    const updatedGift = { ...gifts[index], [key]: value };
    if (key === "limit") {
      updatedGift.initial_limit = value as number;
    }
    update(index, updatedGift);
  };

  const handleDeleteGift = (index: number) => {
    const giftToDelete = gifts[index];

    // Si Jeu = 100% gagnant -> empêcher la suppression du dernier gain illimité
    if (
      isFullWinning &&
      giftToDelete.initial_limit === -1 &&
      giftToDelete.type !== "LOSS"
    ) {
      const otherUnlimitedCount = gifts.filter(
        (g, i) => i !== index && g.initial_limit === -1 && g.type !== "LOSS"
      ).length;

      // Si aucun gain illimité restant -> on n'autorise pas le delete
      if (otherUnlimitedCount === 0) {
        return;
      }
    }
    remove(index);
  };

  const canDeleteGift = (gift: Gift, index: number) => {
    // Ne pas pouvoir supprimer les pertes
    if (gift.type === "LOSS") {
      return false;
    }

    // Si Jeu = 100% gagnant -> ne pas pouvoir supprimer le dernier gain illimité
    if (isFullWinning && gift.initial_limit === -1) {
      const otherUnlimitedCount = gifts.filter(
        (g, i) => i !== index && g.initial_limit === -1 && g.type !== "LOSS"
      ).length;

      return otherUnlimitedCount > 0;
    }

    return true;
  };

  const canToggleUnlimited = (gift: Gift, index: number) => {
    // Ne pas pouvoir modifier le statut des pertes
    if (gift.type === "LOSS") {
      return false;
    }

    // Si Jeu = 100% gagnant -> ne pas pouvoir retirer le statut illimité du dernier gain illimité
    if (isFullWinning && gift.initial_limit === -1) {
      const otherUnlimitedCount = gifts.filter(
        (g, i) => i !== index && g.initial_limit === -1 && g.type !== "LOSS"
      ).length;

      return otherUnlimitedCount > 0;
    }

    return true;
  };

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
            AJOUTEZ ET CONFIGUREZ VOS GAINS
          </Typography>
          <Typography>
            Indiquez les récompenses que vos clients pourront gagner. Offrez des
            cadeaux attractifs pour augmenter leur engagement et leur fidélité.
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
          sx={(theme) => ({
            borderLeft: `0.75rem solid ${theme.palette.secondary.main}`,
            borderTopLeftRadius: "0.25rem",
            borderBottomLeftRadius: "0.25rem",
            px: 2,
            mt: 4,
            display: "flex",
            alignItems: "center",
          })}
        >
          <Typography sx={{ fontWeight: "bold" }}>Jeu 100% Gagnant</Typography>
          <Switch
            checked={isFullWinning}
            onChange={(e) => setIsFullWinning(e.target.checked)}
            color="secondary"
            sx={{
              "& .MuiSwitch-thumb": {
                backgroundColor: "white",
              },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 4,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Typography
            color="grey"
            sx={{ maxWidth: "35rem", fontSize: 14, ml: 3.5 }}
          >
            Cochez cette option pour garantir un gain à chaque jour. Si vous la
            décochez, une case 'Perdu' sera automatiquement ajoutée au jeu.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: { xs: 2, sm: 0 },
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              endIcon={<ConfirmationNumberOutlined />}
              sx={{
                backgroundColor: "secondary.main",
                borderRadius: "0.5rem",
                fontWeight: "normal",
                textTransform: "none",
                padding: "0.5rem 1.5rem",
              }}
              disableElevation
            >
              Lancer le tirage au sort
            </Button>

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
              onClick={handleAddGift}
            >
              Ajouter un gain
            </Button>
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
                  Nom du Gain
                  <IconButton color="primary">
                    <InfoOutlined />
                  </IconButton>
                </TableCell>
                <TableCell
                  sx={{ borderRight: "1px solid #E0E0E0", fontWeight: "bold" }}
                >
                  Catégorie
                  <IconButton color="primary">
                    <InfoOutlined />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Nombre de stock
                  <IconButton color="primary">
                    <InfoOutlined />
                  </IconButton>
                </TableCell>
                <TableCell width={50}></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {gifts.map((gift, index) => {
                const isLoss = gift.type === "LOSS";
                const canDelete = canDeleteGift(gift, index);
                const canToggle = canToggleUnlimited(gift, index);

                return (
                  <TableRow key={gift.id}>
                    <TableCell sx={{ borderRight: "1px solid #E0E0E0" }}>
                      <TextField
                        type="text"
                        value={gift.name}
                        onChange={(e) =>
                          handleGiftChange(index, "name", e.target.value)
                        }
                        InputProps={{ disableUnderline: true }}
                        variant="standard"
                        sx={{ width: "100%" }}
                        disabled={isLoss}
                      />
                    </TableCell>

                    <TableCell
                      sx={{ borderRight: "1px solid #E0E0E0", width: "30rem" }}
                    >
                      <Select
                        value={gift.type}
                        onChange={(e) =>
                          handleGiftChange(index, "type", e.target.value)
                        }
                        fullWidth
                        variant="standard"
                        disableUnderline
                        IconComponent={ExpandMore}
                        sx={{ background: "transparent", fontSize: 14 }}
                        disabled={isLoss}
                      >
                        <MenuItem value="EAT">Nourriture</MenuItem>
                        <MenuItem value="DRINK">Boisson</MenuItem>
                        <MenuItem value="OBJECT">Objet</MenuItem>
                        <MenuItem value="LOSS">Perdu</MenuItem>
                      </Select>
                    </TableCell>

                    <TableCell
                      sx={{ borderRight: "1px solid #E0E0E0", width: "25rem" }}
                    >
                      {gift.limit === -1 ? (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            minWidth: "10rem",
                          }}
                        >
                          <Typography color="grey">Illimité</Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography>Illimité</Typography>
                            <Switch
                              checked={gift.limit === -1}
                              onChange={(e) =>
                                handleToggleUnlimited(index, e.target.checked)
                              }
                              color="primary"
                              disabled={!canToggle}
                              sx={{
                                "& .MuiSwitch-thumb": {
                                  backgroundColor: "white",
                                },
                              }}
                            />
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            minWidth: "10rem",
                          }}
                        >
                          <TextField
                            type="number"
                            value={gift.limit}
                            onChange={(e) =>
                              handleGiftChange(
                                index,
                                "limit",
                                parseInt(e.target.value)
                              )
                            }
                            inputProps={{ min: 1 }}
                            InputProps={{ disableUnderline: true }}
                            variant="standard"
                            sx={{
                              width: "4rem",
                              "& input": {
                                textAlign: "right",
                              },
                            }}
                            disabled={isLoss}
                          />
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography>Illimité</Typography>
                            <Switch
                              checked={false}
                              onChange={() =>
                                handleToggleUnlimited(index, true)
                              }
                              color="primary"
                              disabled={isLoss}
                              sx={{
                                "& .MuiSwitch-thumb": {
                                  backgroundColor: "white",
                                },
                              }}
                            />
                          </Box>
                        </Box>
                      )}
                    </TableCell>

                    <TableCell>
                      {canDelete && (
                        <IconButton
                          sx={{ color: "black" }}
                          onClick={() => handleDeleteGift(index)}
                        >
                          <DeleteOutline />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Box>
  );
}
