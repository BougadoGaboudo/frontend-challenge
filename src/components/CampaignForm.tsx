// CampaignForm.tsx
import { useForm, FormProvider } from "react-hook-form";
import { Box } from "@mui/material";
import CustomGame from "./CustomGame";
import type { Profile, Configuration } from "../types/CampaignType";
import { forwardRef, useImperativeHandle } from "react";
import CampaignAction from "./CampaignAction";
import GameSelector from "./GameSelector";
import ClaimCondition from "./ClaimCondition";
import CustomReward from "./CustomReward";

export type CampaignFormValues = Configuration & { logo?: File | null };

interface CampaignFormProps {
  profile: Profile;
  onSubmit: (data: CampaignFormValues) => void;
}

const CampaignForm = forwardRef(function CampaignForm(
  { profile, onSubmit }: CampaignFormProps,
  ref: React.Ref<{ submit: () => void }>
) {
  const methods = useForm<CampaignFormValues>({
    defaultValues: {
      actions: [],
      colors: {
        primary: "#3F5EFB",
        secondary: "#F59000",
      },
      disabled: false,
      game_type: "WHEEL",
      gifts: [],
      retrievalConditions: [],
      logo_uri: "",
      logo: null,
    },
  });

  useImperativeHandle(ref, () => ({
    submit: () => methods.handleSubmit(onSubmit)(),
  }));

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          mb: "4rem",
        }}
      >
        <CampaignAction />
        <hr />
        <GameSelector profile={profile} />
        <hr />
        <CustomGame
          profile={profile}
          colors={methods.watch("colors")}
          onColorsChange={(colors) => methods.setValue("colors", colors)}
        />
        <hr />
        <CustomReward />
        <hr />
        <ClaimCondition
          gifts={methods.watch("gifts")}
          onChange={(retrievalConditions) =>
            methods.setValue("retrievalConditions", retrievalConditions)
          }
        />
      </Box>
    </FormProvider>
  );
});

export default CampaignForm;
