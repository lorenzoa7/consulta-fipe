import { getFipeInformation } from '@/api/get-fipe-information'
import { localStorageNames } from '@/config/storage'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AppState = {
  savedInformation: Awaited<ReturnType<typeof getFipeInformation>>[]
}
export const useAppStore = create<AppState>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set) => ({
      savedInformation: [],
    }),
    {
      name: localStorageNames.appStorage,
    },
  ),
)
