import create from "zustand";

export const useStore = create((set) => ({
	user: null,
	setUser: (e) => set({ user: e }),

	loadingUser: true,
	setLoadingUser: (e) => set({ loadingUser: e }),

	image: null,
	setImage: (e) => set({ image: e }),
}));
