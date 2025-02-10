import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { database } from "../components/firebasesetup";

export const useUserStore = create((set, get) => ({
  currentUser: null,
  isLoading: false,
  error: null,

  fetchUserInfo: async (uid) => {
    if (!uid) {
      console.log("No UID provided, resetting state.");
      return set({ currentUser: null, isLoading: false, error: null });
    }

    // Prevent unnecessary re-fetching if data already exists
    if (get().currentUser?.uid === uid) {
      console.log("User data already fetched.");
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const docRef = doc(database, "usersdetails", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("User found:", docSnap.data());
        set({ currentUser: { uid, ...docSnap.data() }, isLoading: false });
      } else {
        console.log("User document does not exist.");
        set({ currentUser: null, isLoading: false, error: "User not found" });
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      set({ currentUser: null, isLoading: false, error: err.message });
    }
  },

  clearUserInfo: () => set({ currentUser: null, isLoading: false, error: null }),
}));
