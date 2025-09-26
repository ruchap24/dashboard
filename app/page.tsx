import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardGrid } from "@/components/dashboard-grid"
// import { DevelopmentSteps } from "@/components/development-steps"

export default function CropMonitoringDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <main className="flex-1 p-6">
          <DashboardGrid />
        </main>
        {/* <aside className="w-80 border-l border-border bg-card p-4">
          <DevelopmentSteps />
        </aside> */}
      </div>
    </div>
  )
}
