import { Container } from "@mui/material";
import Header from "./components/Header";
import SystemAlert from "./components/SystemAlert";
import { useRef } from "react";
import CampaignForm, {
  type CampaignFormValues,
} from "./components/CampaignForm";

function App() {
  const formRef = useRef<{ submit: () => void }>(null);

  const handleSubmit = (data: CampaignFormValues) => {
    console.log("Data du form :", data);
  };

  return (
    <>
      <Header onSaveClick={() => formRef.current?.submit()} />
      <Container maxWidth="xl">
        <SystemAlert />
        <CampaignForm ref={formRef} profile="PREMIUM" onSubmit={handleSubmit} />
      </Container>
    </>
  );
}

export default App;
