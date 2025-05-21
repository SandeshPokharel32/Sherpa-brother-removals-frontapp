import React from "react";
import { fetchAllExpeditions } from "@/graphql/api/fetchAllExpeditions";
import ExpeditionsClientPage from "@/components/expeditions/expedition-page";

export default async function ExpeditionsPage() {
  const expeditions = await fetchAllExpeditions();

  return (
    <ExpeditionsClientPage
      expeditions={expeditions?.expeditionCollection?.items || []}
    />
  );
}
