import type { Conditions, Gift } from "../types/CampaignType";
import {
  Add,
  DeleteOutline,
  ExpandMore,
  InfoOutlined,
  ModeOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  IconButton,
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

type Props = {
  gifts: Gift[];
  onChange?: (retrievalConditions: Conditions[]) => void;
};

export default function ClaimCondition({ gifts, onChange }: Props) {
  const [open, setOpen] = useState(true);
  const [hasCondition, setHasCondition] = useState(false);
  const [minPurchase, setMinPurchase] = useState("");
  const [conditions, setConditions] = useState<
    { giftId: string; amount?: number }[]
  >([]);

  const getConditionForGift = (giftId: string) =>
    conditions.find((c) => c.giftId === giftId);

  const handleAddCondition = (giftId: string) => {
    if (!minPurchase) return;
    setConditions([...conditions, { giftId, amount: parseFloat(minPurchase) }]);
  };

  const handleEditCondition = (giftId: string) => {
    if (!minPurchase) return;
    setConditions(
      conditions.map((c) =>
        c.giftId === giftId ? { ...c, amount: parseFloat(minPurchase) } : c
      )
    );
  };

  const handleDeleteCondition = (giftId: string) => {
    setConditions(conditions.filter((c) => c.giftId !== giftId));
  };

  useEffect(() => {
    const formattedConditions: Conditions[] = conditions.map((c) => ({
      id: c.giftId,
      name: "Montant minimum",
      value: c.amount?.toString() || "",
    }));

    onChange?.(formattedConditions);
  }, [conditions]);

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
            DÉFINISSEZ LES CONDITIONS POUR RÉCUPÉRER LES CADEAUX
          </Typography>
          <Typography>
            Paramétrez si vos clients doivent remplir une condition (ex: montant
            minimum d'achat) pour pouvoir repartir avec leur cadeau.
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
          sx={{ display: "flex", flexDirection: "column", maxWidth: "30rem" }}
        >
          <Box
            sx={(theme) => ({
              borderLeft: `0.75rem solid ${
                !hasCondition ? theme.palette.secondary.main : "grey"
              }`,
              borderTopLeftRadius: "0.25rem",
              borderBottomLeftRadius: "0.25rem",
              px: 2,
              mt: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            })}
          >
            <Typography
              sx={{ fontWeight: "bold", color: hasCondition ? "grey" : "" }}
            >
              Pas de condition
            </Typography>
            <Switch
              checked={!hasCondition}
              onChange={() => setHasCondition(false)}
              color="secondary"
              sx={{
                "& .MuiSwitch-thumb": {
                  backgroundColor: "white",
                },
              }}
            />
          </Box>

          <Typography color="grey" sx={{ ml: 3.5 }}>
            Les clients peuvent récupérer leur gain sans aucun achat.
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", maxWidth: "30rem" }}
        >
          <Box
            sx={(theme) => ({
              borderLeft: `0.75rem solid ${
                hasCondition ? theme.palette.secondary.main : "grey"
              }`,
              borderTopLeftRadius: "0.25rem",
              borderBottomLeftRadius: "0.25rem",
              px: 2,
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            })}
          >
            <Typography
              sx={{ fontWeight: "bold", color: hasCondition ? "" : "grey" }}
            >
              Sous condition d'achat minimale
            </Typography>
            <Switch
              checked={hasCondition}
              onChange={() => setHasCondition(true)}
              color="secondary"
              sx={{
                "& .MuiSwitch-thumb": {
                  backgroundColor: "white",
                },
              }}
            />
          </Box>
          <Typography color="grey" sx={{ ml: 3.5 }}>
            Exigez un montant minimum d'achat en boutique pour permettre la
            récupération du gain.
          </Typography>

          <TextField
            type="number"
            label="Montant à atteindre"
            value={minPurchase}
            onChange={(e) => setMinPurchase(e.target.value)}
            inputProps={{ min: 1 }}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            placeholder="Ex : 10€ d'achat minimum pour récupérer le gain"
            disabled={!hasCondition}
            sx={{
              width: "26.5rem",
              borderRadius: "0.5rem",
              ml: 3.5,
              mt: 3,
              "& input": {
                textAlign: "right",
              },
            }}
          />
        </Box>

        <Box
          sx={{
            mt: 6,
            ml: 3.5,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              mb: 1,
            }}
          >
            Conditions personnalisées par gain
          </Typography>
          <Typography color="grey">
            Vous pouvez définir une condition spécifique sur un ou plusieurs
            gains.
          </Typography>
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
                  sx={{
                    borderRight: "1px solid #E0E0E0",
                    fontWeight: "bold",
                    width: "30rem",
                  }}
                >
                  Gain
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "1px solid #E0E0E0",
                    fontWeight: "bold",
                    width: "30rem",
                  }}
                >
                  Condition
                  <IconButton color="primary">
                    <InfoOutlined />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Action
                  <IconButton color="primary">
                    <InfoOutlined />
                  </IconButton>
                </TableCell>
                <TableCell width={50}></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {gifts.map((gift) => {
                const condition = getConditionForGift(gift.id);

                return (
                  <TableRow key={gift.id}>
                    <TableCell sx={{ borderRight: "1px solid #E0E0E0" }}>
                      {gift.name}
                    </TableCell>
                    <TableCell sx={{ borderRight: "1px solid #E0E0E0" }}>
                      {condition
                        ? `Achat minimum de ${condition.amount}€`
                        : "Aucune"}
                    </TableCell>
                    <TableCell
                      sx={{ borderRight: condition && "1px solid #E0E0E0" }}
                    >
                      {condition ? (
                        <>
                          <Button
                            onClick={() => handleEditCondition(gift.id)}
                            sx={{
                              textTransform: "none",
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <ModeOutlined />
                            Modifier
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => handleAddCondition(gift.id)}
                          sx={{
                            textTransform: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                          disabled={!minPurchase}
                        >
                          <Add />
                          Ajouter une condition
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {condition && (
                        <IconButton
                          onClick={() => handleDeleteCondition(gift.id)}
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
