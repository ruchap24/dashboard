"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Activity, Zap, Calendar, Filter } from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts"

// Sample data for demonstrations
const ndviData = [
  { date: "2024-01", ndvi: 0.65, evi: 0.58, field: "Field A" },
  { date: "2024-02", ndvi: 0.72, evi: 0.64, field: "Field A" },
  { date: "2024-03", ndvi: 0.78, evi: 0.71, field: "Field A" },
  { date: "2024-04", ndvi: 0.82, evi: 0.75, field: "Field A" },
  { date: "2024-05", ndvi: 0.79, evi: 0.72, field: "Field A" },
  { date: "2024-06", ndvi: 0.85, evi: 0.78, field: "Field A" },
]

const soilData = [
  { parameter: "pH", value: 6.8, optimal: 6.5, unit: "" },
  { parameter: "Nitrogen", value: 45, optimal: 50, unit: "ppm" },
  { parameter: "Phosphorus", value: 32, optimal: 30, unit: "ppm" },
  { parameter: "Potassium", value: 180, optimal: 200, unit: "ppm" },
  { parameter: "Moisture", value: 65, optimal: 70, unit: "%" },
]

const cropHealthDistribution = [
  { name: "Healthy", value: 87, color: "hsl(var(--primary))" },
  { name: "Stressed", value: 10, color: "hsl(var(--accent))" },
  { name: "Diseased", value: 3, color: "hsl(var(--destructive))" },
]

const temperatureHumidityData = [
  { time: "00:00", temperature: 18, humidity: 75 },
  { time: "04:00", temperature: 16, humidity: 82 },
  { time: "08:00", temperature: 22, humidity: 68 },
  { time: "12:00", temperature: 28, humidity: 55 },
  { time: "16:00", temperature: 31, humidity: 48 },
  { time: "20:00", temperature: 25, humidity: 62 },
]

export function DataVisualizationPanel() {
  const [selectedField, setSelectedField] = useState("all")
  const [timeRange, setTimeRange] = useState("6months")

  return (
    <Card className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              {"Data Visualizations"}
            </CardTitle>
            <CardDescription>{"Interactive charts, heatmaps, and trend analysis"}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{"All Fields"}</SelectItem>
                <SelectItem value="field-a">{"Field A"}</SelectItem>
                <SelectItem value="field-b">{"Field B"}</SelectItem>
                <SelectItem value="field-c">{"Field C"}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="vegetation" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vegetation">{"Vegetation"}</TabsTrigger>
            <TabsTrigger value="soil">{"Soil"}</TabsTrigger>
            <TabsTrigger value="health">{"Health"}</TabsTrigger>
            <TabsTrigger value="environment">{"Environment"}</TabsTrigger>
          </TabsList>

          <TabsContent value="vegetation" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">{"NDVI/EVI Trend Analysis"}</h3>
              <Badge variant="secondary" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                {"+12% vs last period"}
              </Badge>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ndviData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 1]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ndvi"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    name="NDVI"
                  />
                  <Line
                    type="monotone"
                    dataKey="evi"
                    stroke="hsl(var(--accent))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 4 }}
                    name="EVI"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="soil" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">{"Soil Parameter Analysis"}</h3>
              <Badge variant="outline" className="text-xs">
                <Activity className="h-3 w-3 mr-1" />
                {"Real-time monitoring"}
              </Badge>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={soilData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis
                    type="category"
                    dataKey="parameter"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                    formatter={(value, name) => [
                      `${value}${soilData.find((d) => d.value === value)?.unit || ""}`,
                      name === "value" ? "Current" : "Optimal",
                    ]}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Current Value" />
                  <Bar
                    dataKey="optimal"
                    fill="hsl(var(--accent))"
                    radius={[0, 4, 4, 0]}
                    opacity={0.6}
                    name="Optimal Range"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="health" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">{"Crop Health Distribution"}</h3>
              <Badge variant="secondary" className="text-xs">
                <Zap className="h-3 w-3 mr-1" />
                {"AI Analysis"}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cropHealthDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {cropHealthDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                      formatter={(value) => [`${value}%`, "Coverage"]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={cropHealthDistribution}>
                    <RadialBar dataKey="value" cornerRadius={10} fill="hsl(var(--primary))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                      formatter={(value) => [`${value}%`, "Health Score"]}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="environment" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">{"Temperature & Humidity Trends"}</h3>
              <Badge variant="outline" className="text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                {"Last 24 hours"}
              </Badge>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={temperatureHumidityData}>
                  <defs>
                    <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                    formatter={(value, name) => [
                      `${value}${name === "temperature" ? "°C" : "%"}`,
                      name === "temperature" ? "Temperature" : "Humidity",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="temperature"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#temperatureGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="humidity"
                    stroke="hsl(var(--accent))"
                    fillOpacity={1}
                    fill="url(#humidityGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
