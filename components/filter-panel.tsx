"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Filter, X, CalendarIcon, ChevronDown, ChevronUp, RotateCcw, Search, MapPin, Activity, Zap } from "lucide-react"
import { format } from "date-fns"

interface FilterState {
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  fields: string[]
  cropTypes: string[]
  healthRange: [number, number]
  showAlerts: boolean
  sensorTypes: string[]
  dataTypes: string[]
  searchQuery: string
}

interface FilterPanelProps {
  isOpen: boolean
  onToggle: () => void
  onFiltersChange: (filters: FilterState) => void
}

const defaultFilters: FilterState = {
  dateRange: { from: undefined, to: undefined },
  fields: [],
  cropTypes: [],
  healthRange: [0, 100],
  showAlerts: false,
  sensorTypes: [],
  dataTypes: [],
  searchQuery: "",
}

export function FilterPanel({ isOpen, onToggle, onFiltersChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [expandedSections, setExpandedSections] = useState<string[]>(["basic", "advanced"])

  const updateFilters = (updates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updates }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const activeFiltersCount = [
    filters.fields.length,
    filters.cropTypes.length,
    filters.sensorTypes.length,
    filters.dataTypes.length,
    filters.dateRange.from ? 1 : 0,
    filters.showAlerts ? 1 : 0,
    filters.searchQuery ? 1 : 0,
  ].reduce((sum, count) => sum + count, 0)

  return (
    <>
      {/* Filter Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className={`fixed top-20 right-6 z-50 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-0"
        }`}
      >
        <Filter className="h-4 w-4 mr-2" />
        {"Filters"}
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" className="ml-2 text-xs">
            {activeFiltersCount}
          </Badge>
        )}
      </Button>

      {/* Filter Panel Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onToggle}
        />
      )}

      {/* Sliding Filter Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-card border-l shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">{"Data Filters"}</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onToggle}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">{"Search"}</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search fields, crops, sensors..."
                  value={filters.searchQuery}
                  onChange={(e) => updateFilters({ searchQuery: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Basic Filters */}
            <Card>
              <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("basic")}>
                <CardTitle className="text-sm flex items-center justify-between">
                  {"Basic Filters"}
                  {expandedSections.includes("basic") ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </CardTitle>
              </CardHeader>
              {expandedSections.includes("basic") && (
                <CardContent className="space-y-4 animate-fade-in-up">
                  {/* Date Range */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{"Date Range"}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filters.dateRange.from ? (
                            filters.dateRange.to ? (
                              <>
                                {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                                {format(filters.dateRange.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(filters.dateRange.from, "LLL dd, y")
                            )
                          ) : (
                            <span>{"Pick a date range"}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={filters.dateRange.from}
                          selected={filters.dateRange}
                          onSelect={(range) =>
                            updateFilters({ dateRange: range || { from: undefined, to: undefined } })
                          }
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Fields */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{"Fields"}</Label>
                    <Select
                      value={filters.fields[0] || ""}
                      onValueChange={(value) => updateFilters({ fields: value ? [value] : [] })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select fields..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="field-a">{"Field A - North"}</SelectItem>
                        <SelectItem value="field-b">{"Field B - East"}</SelectItem>
                        <SelectItem value="field-c">{"Field C - South"}</SelectItem>
                        <SelectItem value="all">{"All Fields"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Crop Types */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{"Crop Types"}</Label>
                    <Select
                      value={filters.cropTypes[0] || ""}
                      onValueChange={(value) => updateFilters({ cropTypes: value ? [value] : [] })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop types..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corn">{"Corn"}</SelectItem>
                        <SelectItem value="wheat">{"Wheat"}</SelectItem>
                        <SelectItem value="soybeans">{"Soybeans"}</SelectItem>
                        <SelectItem value="all">{"All Crops"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Health Range */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      {"Health Score Range: "}
                      {filters.healthRange[0]}% - {filters.healthRange[1]}%
                    </Label>
                    <Slider
                      value={filters.healthRange}
                      onValueChange={(value) => updateFilters({ healthRange: value as [number, number] })}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Advanced Filters */}
            <Card>
              <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("advanced")}>
                <CardTitle className="text-sm flex items-center justify-between">
                  {"Advanced Filters"}
                  {expandedSections.includes("advanced") ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </CardTitle>
              </CardHeader>
              {expandedSections.includes("advanced") && (
                <CardContent className="space-y-4 animate-fade-in-up">
                  {/* Show Alerts Only */}
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">{"Show Alerts Only"}</Label>
                    <Switch
                      checked={filters.showAlerts}
                      onCheckedChange={(checked) => updateFilters({ showAlerts: checked })}
                    />
                  </div>

                  {/* Sensor Types */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{"Sensor Types"}</Label>
                    <div className="space-y-2">
                      {[
                        { id: "soil", label: "Soil Monitors", icon: MapPin },
                        { id: "weather", label: "Weather Stations", icon: Activity },
                        { id: "pest", label: "Pest Traps", icon: Zap },
                      ].map((sensor) => (
                        <div key={sensor.id} className="flex items-center space-x-2">
                          <Switch
                            id={sensor.id}
                            checked={filters.sensorTypes.includes(sensor.id)}
                            onCheckedChange={(checked) => {
                              const newTypes = checked
                                ? [...filters.sensorTypes, sensor.id]
                                : filters.sensorTypes.filter((t) => t !== sensor.id)
                              updateFilters({ sensorTypes: newTypes })
                            }}
                          />
                          <Label htmlFor={sensor.id} className="text-sm flex items-center gap-2">
                            <sensor.icon className="h-4 w-4" />
                            {sensor.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Data Types */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{"Data Types"}</Label>
                    <div className="space-y-2">
                      {["NDVI/EVI", "Soil Parameters", "Weather Data", "Pest Activity", "AI Predictions"].map(
                        (dataType) => (
                          <div key={dataType} className="flex items-center space-x-2">
                            <Switch
                              id={dataType}
                              checked={filters.dataTypes.includes(dataType)}
                              onCheckedChange={(checked) => {
                                const newTypes = checked
                                  ? [...filters.dataTypes, dataType]
                                  : filters.dataTypes.filter((t) => t !== dataType)
                                updateFilters({ dataTypes: newTypes })
                              }}
                            />
                            <Label htmlFor={dataType} className="text-sm">
                              {dataType}
                            </Label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-muted/50">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {activeFiltersCount > 0
                  ? `${activeFiltersCount} filter${activeFiltersCount > 1 ? "s" : ""} active`
                  : "No filters applied"}
              </span>
              <Button variant="ghost" size="sm" onClick={onToggle}>
                {"Apply Filters"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
