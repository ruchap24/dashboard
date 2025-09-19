"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Map, Layers, MapPin, Satellite, Navigation, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface FieldData {
  id: string
  name: string
  coordinates: [number, number][]
  healthScore: number
  area: number
  cropType: string
  lastUpdated: string
  alerts: string[]
}

interface SensorMarker {
  id: string
  name: string
  coordinates: [number, number]
  type: "soil" | "weather" | "pest"
  status: "active" | "inactive" | "warning"
  lastReading: string
  value: string
}

const fieldData: FieldData[] = [
  {
    id: "field-a",
    name: "Field A - North",
    coordinates: [
      [40.7128, -74.006],
      [40.7138, -74.005],
      [40.7148, -74.007],
      [40.7138, -74.008],
    ],
    healthScore: 87,
    area: 12.5,
    cropType: "Corn",
    lastUpdated: "2 hours ago",
    alerts: ["Low nitrogen detected"],
  },
  {
    id: "field-b",
    name: "Field B - East",
    coordinates: [
      [40.7158, -74.004],
      [40.7168, -74.003],
      [40.7178, -74.005],
      [40.7168, -74.006],
    ],
    healthScore: 92,
    area: 8.3,
    cropType: "Wheat",
    lastUpdated: "1 hour ago",
    alerts: [],
  },
  {
    id: "field-c",
    name: "Field C - South",
    coordinates: [
      [40.7108, -74.007],
      [40.7118, -74.006],
      [40.7128, -74.008],
      [40.7118, -74.009],
    ],
    healthScore: 74,
    area: 15.2,
    cropType: "Soybeans",
    lastUpdated: "30 minutes ago",
    alerts: ["Pest activity detected", "Irrigation needed"],
  },
]

const sensorMarkers: SensorMarker[] = [
  {
    id: "sensor-1",
    name: "Soil Monitor A1",
    coordinates: [40.7133, -74.0065],
    type: "soil",
    status: "active",
    lastReading: "5 min ago",
    value: "pH: 6.8, N: 45ppm",
  },
  {
    id: "sensor-2",
    name: "Weather Station B1",
    coordinates: [40.7163, -74.0045],
    type: "weather",
    status: "active",
    lastReading: "2 min ago",
    value: "24°C, 65% RH",
  },
  {
    id: "sensor-3",
    name: "Pest Trap C1",
    coordinates: [40.7113, -74.0075],
    type: "pest",
    status: "warning",
    lastReading: "1 hour ago",
    value: "3 captures detected",
  },
]

export function GeospatialMapping() {
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [mapView, setMapView] = useState<"satellite" | "terrain" | "hybrid">("hybrid")
  const [showSensors, setShowSensors] = useState(true)
  const [animatedMarkers, setAnimatedMarkers] = useState<string[]>([])

  useEffect(() => {
    // Simulate animated markers for active sensors
    const interval = setInterval(() => {
      const activeSensors = sensorMarkers.filter((s) => s.status === "active").map((s) => s.id)
      setAnimatedMarkers(activeSensors)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getHealthColor = (score: number) => {
    if (score >= 85) return "bg-primary"
    if (score >= 70) return "bg-accent"
    return "bg-destructive"
  }

  const getSensorColor = (type: string, status: string) => {
    if (status === "warning") return "bg-destructive"
    switch (type) {
      case "soil":
        return "bg-primary"
      case "weather":
        return "bg-accent"
      case "pest":
        return "bg-secondary"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card className="animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5 text-primary" />
              {"Geospatial Mapping"}
            </CardTitle>
            <CardDescription>{"Interactive field maps with crop boundaries and sensor data"}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={mapView} onValueChange={(value: any) => setMapView(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="satellite">{"Satellite"}</SelectItem>
                <SelectItem value="terrain">{"Terrain"}</SelectItem>
                <SelectItem value="hybrid">{"Hybrid"}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => setShowSensors(!showSensors)}>
              <Layers className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Navigation className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <Satellite className="h-3 w-3 mr-1" />
              {"Live Satellite Data"}
            </Badge>
          </div>
        </div>

        {/* Interactive Map Area */}
        <div className="relative h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border overflow-hidden">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-green-200 via-yellow-100 to-blue-200" />
            {/* Grid overlay to simulate map tiles */}
            <div className="absolute inset-0 opacity-30">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute border-r border-gray-300"
                  style={{ left: `${(i + 1) * 12.5}%`, height: "100%" }}
                />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute border-b border-gray-300"
                  style={{ top: `${(i + 1) * 16.67}%`, width: "100%" }}
                />
              ))}
            </div>
          </div>

          {/* Field Boundaries */}
          {fieldData.map((field, index) => (
            <div
              key={field.id}
              className={`absolute border-2 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedField === field.id ? "ring-2 ring-primary shadow-lg" : ""
              }`}
              style={{
                left: `${20 + index * 25}%`,
                top: `${20 + index * 15}%`,
                width: `${15 + field.area}%`,
                height: `${20 + field.area * 0.8}%`,
                borderColor:
                  field.healthScore >= 85
                    ? "hsl(var(--primary))"
                    : field.healthScore >= 70
                      ? "hsl(var(--accent))"
                      : "hsl(var(--destructive))",
                backgroundColor: `${field.healthScore >= 85 ? "hsl(var(--primary))" : field.healthScore >= 70 ? "hsl(var(--accent))" : "hsl(var(--destructive))"}/10`,
              }}
              onClick={() => setSelectedField(selectedField === field.id ? null : field.id)}
            >
              <div className="absolute -top-8 left-0 bg-card border rounded px-2 py-1 shadow-sm">
                <div className="text-xs font-medium">{field.name}</div>
                <div className="text-xs text-muted-foreground">{field.healthScore}% Health</div>
              </div>

              {/* Animated health indicator */}
              <div
                className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getHealthColor(field.healthScore)} animate-pulse`}
              />

              {/* Alert indicators */}
              {field.alerts.length > 0 && (
                <div className="absolute bottom-2 left-2">
                  <Badge variant="destructive" className="text-xs animate-pulse">
                    {field.alerts.length} Alert{field.alerts.length > 1 ? "s" : ""}
                  </Badge>
                </div>
              )}
            </div>
          ))}

          {/* Sensor Markers */}
          {showSensors &&
            sensorMarkers.map((sensor, index) => (
              <div
                key={sensor.id}
                className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-125 ${getSensorColor(
                  sensor.type,
                  sensor.status,
                )} ${animatedMarkers.includes(sensor.id) ? "animate-pulse-glow" : ""}`}
                style={{
                  left: `${30 + index * 20}%`,
                  top: `${40 + index * 10}%`,
                }}
                title={`${sensor.name}: ${sensor.value}`}
              >
                <MapPin className="h-3 w-3 text-white absolute -top-0.5 -left-0.5" />
              </div>
            ))}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border rounded-lg p-3 space-y-2">
            <h4 className="text-xs font-medium">{"Legend"}</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-primary" />
                <span>{"Healthy (85%+)"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-accent" />
                <span>{"Stressed (70-84%)"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-destructive" />
                <span>{"Critical (<70%)"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Field Details Panel */}
        {selectedField && (
          <Card className="animate-fade-in-up">
            <CardContent className="p-4">
              {(() => {
                const field = fieldData.find((f) => f.id === selectedField)
                if (!field) return null

                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{field.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {field.cropType} • {field.area} hectares
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{field.healthScore}%</div>
                        <p className="text-xs text-muted-foreground">Health Score</p>
                      </div>
                    </div>

                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">{"Overview"}</TabsTrigger>
                        <TabsTrigger value="sensors">{"Sensors"}</TabsTrigger>
                        <TabsTrigger value="history">{"History"}</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Last Updated</p>
                            <p className="text-sm font-medium">{field.lastUpdated}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Crop Type</p>
                            <p className="text-sm font-medium">{field.cropType}</p>
                          </div>
                        </div>

                        {field.alerts.length > 0 && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Active Alerts</p>
                            <div className="space-y-1">
                              {field.alerts.map((alert, index) => (
                                <Badge key={index} variant="destructive" className="text-xs mr-2">
                                  {alert}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="sensors" className="space-y-2">
                        {sensorMarkers.map((sensor) => (
                          <div key={sensor.id} className="flex items-center justify-between p-2 bg-muted rounded">
                            <div>
                              <p className="text-sm font-medium">{sensor.name}</p>
                              <p className="text-xs text-muted-foreground">{sensor.value}</p>
                            </div>
                            <Badge
                              variant={sensor.status === "active" ? "secondary" : "destructive"}
                              className="text-xs"
                            >
                              {sensor.status}
                            </Badge>
                          </div>
                        ))}
                      </TabsContent>

                      <TabsContent value="history" className="space-y-2">
                        <div className="text-center py-8 text-muted-foreground">
                          <p className="text-sm">Historical data visualization would appear here</p>
                          <p className="text-xs">NDVI trends, yield history, weather patterns</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )
              })()}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
