import {
  Box,
  Card,
  CardMedia,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";
import type { GameType, Profile } from "../types/CampaignType";
import { ExpandMore } from "@mui/icons-material";
import cardImg from "../assets/card.png";
import mysteryImg from "../assets/mystery.png";
import slotImg from "../assets/slot.png";
import wheelImg from "../assets/wheel.jpg";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { CampaignFormValues } from "./CampaignForm";

interface GameSelectorProps {
  profile: Profile;
}

const gameTypes: { value: GameType; image: string }[] = [
  { value: "WHEEL", image: wheelImg },
  { value: "MYSTERY", image: mysteryImg },
  { value: "SLOT_MACHINE", image: slotImg },
  { value: "CARD", image: cardImg },
];

export default function GameSelector({ profile }: GameSelectorProps) {
  const { watch, setValue } = useFormContext<CampaignFormValues>();
  const value = watch("game_type");

  const disabled = profile === "BASIC";
  const [open, setOpen] = useState(true);

  return (
    <>
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
              CHOIX DU JEU
            </Typography>
            <Typography>
              Sélectionnez parmi 4 jeux interactifs pour engager vos
              utilisateurs et créer une expérience unique.
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
          <Box sx={{ display: "flex", gap: 3, mt: 4 }}>
            {gameTypes.map((game) => {
              const isSelected = value === game.value;
              const isDisabled = disabled && game.value !== "WHEEL";

              return (
                <Card
                  key={game.value}
                  onClick={() =>
                    !isDisabled && setValue("game_type", game.value)
                  }
                  sx={(theme) => ({
                    width: "18rem",
                    height: "18rem",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    border: isSelected
                      ? `0.4rem solid ${theme.palette.primary.main}`
                      : "",
                    borderRadius: 2,
                    opacity: isDisabled ? 0.5 : 1,
                    transition: "all 0.2s ease",
                    boxShadow: "none",
                  })}
                  raised={isSelected}
                >
                  <CardMedia
                    component="img"
                    image={game.image}
                    alt={game.value}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Card>
              );
            })}
          </Box>
        </Collapse>
      </Box>
    </>
  );
}
