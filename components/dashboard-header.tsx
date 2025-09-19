"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf, Upload, Settings, Bell } from "lucide-react"
import { FilterPanel } from "@/components/filter-panel"

export function DashboardHeader() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleFiltersChange = (filters: any) => {
    // Handle filter changes - could update global state or trigger data refetch
    console.log("Filters updated:", filters)
  }

  return (
    <>
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary p-2">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{"AI-Powered Crop Monitoring"}</h1>
                <p className="text-sm text-muted-foreground">{"Multispectral Analysis & Sensor Data Platform"}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="animate-pulse-glow">
              {"System Active"}
            </Badge>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Upload className="h-4 w-4 mr-2" />
                {"Upload Data"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onToggle={() => setIsFilterOpen(!isFilterOpen)}
        onFiltersChange={handleFiltersChange}
      />
    </>
  )
}
