import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Thermometer, Droplets, Bug, Wheat } from "lucide-react"
import { FileUploadSystem } from "@/components/file-upload-system"
import { DataVisualizationPanel } from "@/components/data-visualization-panel"
import { AIModelResults } from "@/components/ai-model-results"
import { GeospatialMapping } from "@/components/geospatial-mapping"

export function DashboardGrid() {
  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="animate-fade-in-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{"Crop Health"}</CardTitle>
            <Wheat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{"87%"}</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-xs">
                {"Healthy"}
              </Badge>
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{"Soil Moisture"}</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{"65%"}</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-xs">
                {"Optimal"}
              </Badge>
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{"Temperature"}</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{"24°C"}</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-xs">
                {"Normal"}
              </Badge>
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{"Pest Risk"}</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{"Low"}</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {"Monitored"}
              </Badge>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload Module */}
        <FileUploadSystem />

        {/* AI Model Results */}
        <AIModelResults />

        {/* Data Visualization */}
        <DataVisualizationPanel />

        {/* Geospatial Mapping */}
        <GeospatialMapping />
      </div>
    </div>
  )
}
