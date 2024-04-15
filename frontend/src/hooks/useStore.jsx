import { create } from 'zustand'

export const useStore = create((set) => ({
    scene_state: [],
    setSceneState: (newState) => set((state) => ({ scene_state: newState })),
}))