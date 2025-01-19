import { createFileRoute } from "@tanstack/react-router";
import { PlusCircleIcon } from "lucide-react";
import { useState, useEffect } from "react"
import { MdFilter9Plus } from "react-icons/md";
import WaitlistTable from "../components/ui/waitlist-table";
import { clothingList } from "./clothes";
import { useAllWaitlist } from "../hooks/queries/use-waitlist";

export const Route = createFileRoute("/waitlist")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: waitinglist, isLoading, error } = useAllWaitlist()

  if (isLoading) {
    <>isLoading....</>
  } else if (error) {
    <>Errorororor</>
  }

  return (
    <main className="grid gap-3">
      <div className="flex flex-col lg:justify-between lg:items-center lg:flex-row">
        <label className="text-[2rem] lg:text-[3rem] font-Railway">Waitlist</label>
      </div>

      <div className="w-full bg-RichBlack h-[1px]" />
      <WaitlistTable waitlist={waitinglist} />
    </main>
  );
}
