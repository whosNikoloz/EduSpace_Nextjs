import { create } from "zustand";

type StepStore = {
  inViewStep: string | null;
  setInViewStep: (step: string | null) => void;
};

export const useStepStore = create<StepStore>((set) => ({
  inViewStep: null,
  setInViewStep: (step: string | null) => set({ inViewStep: step }),
}));
