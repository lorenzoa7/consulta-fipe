'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useAppStore } from '@/hooks/use-app-store'
import { FipeInformationCard } from './fipe-information-card'

export function SavedInformationList() {
  const { savedInformation } = useAppStore()
  return (
    <ScrollArea className="md:h-[26rem] lg:h-[28rem] xl:h-[30rem] 2xl:h-[40rem]">
      <div className="space-y-2 py-1 pr-3">
        {savedInformation.length > 0 ? (
          savedInformation.map((item) => (
            <FipeInformationCard
              key={item.id}
              fipeInformation={item}
              isInSavedList
            />
          ))
        ) : (
          <div className="flex w-full items-center justify-center">
            <span className="text-lg font-medium text-muted-foreground">
              Nenhum item salvo
            </span>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
