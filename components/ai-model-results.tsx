"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Activity, AlertTriangle, CheckCircle2, Zap, Eye, Target, Layers, Clock, BarChart3 } from "lucide-react"

interface ModelResult {
  id: string
  name: string
  type: "CNN" | "Random Forest" | "SVM" | "LSTM" | "Vision Transformer"
  status: "active" | "processing" | "completed" | "error" | "standby"
  accuracy: number
  confidence: number
  lastRun: string
  predictions: any[]
  metrics: {
    precision: number
    recall: number
    f1Score: number
  }
}

const modelResults: ModelResult[] = [
  {
    id: "crop-health-cnn",
    name: "Crop Health Analysis",
    type: "CNN",
    status: "active",
    accuracy: 94.2,
    confidence: 87.5,
    lastRun: "2 minutes ago",
    predictions: [
      { class: "Healthy", probability: 0.875, area: "78.2%" },
      { class: "Stressed", probability: 0.098, area: "12.1%" },
      { class: "Diseased", probability: 0.027, area: "9.7%" },
    ],
    metrics: {
      precision: 0.942,
      recall: 0.938,
      f1Score: 0.94,
    },
  },
  {
    id: "soil-analysis-rf",
    name: "Soil Condition Analysis",
    type: "Random Forest",
    status: "processing",
    accuracy: 91.8,
    confidence: 82.3,
    lastRun: "5 minutes ago",
    predictions: [
      { parameter: "pH Level", value: 6.8, status: "optimal", range: "6.0-7.0" },
      { parameter: "Nitrogen", value: 45, status: "low", range: "50-80 ppm" },
      { parameter: "Phosphorus", value: 32, status: "optimal", range: "25-35 ppm" },
      { parameter: "Potassium", value: 180, status: "high", range: "150-200 ppm" },
    ],
    metrics: {
      precision: 0.918,
      recall: 0.915,
      f1Score: 0.916,
    },
  },
  {
    id: "pest-detection-svm",
    name: "Pest Risk Assessment",
    type: "SVM",
    status: "completed",
    accuracy: 88.7,
    confidence: 76.4,
    lastRun: "15 minutes ago",
    predictions: [
      { pest: "Aphids", risk: "low", probability: 0.12, location: "Field A-North" },
      { pest: "Caterpillars", risk: "medium", probability: 0.34, location: "Field B-East" },
      { pest: "Fungal Disease", risk: "low", probability: 0.08, location: "Field C-South" },
    ],
    metrics: {
      precision: 0.887,
      recall: 0.882,
      f1Score: 0.884,
    },
  },
]

const ensembleResults = {
  overallHealth: 87.2,
  riskLevel: "low",
  recommendations: [
    "Increase nitrogen fertilization in Field A",
    "Monitor caterpillar activity in Field B-East",
    "Maintain current irrigation schedule",
    "Consider preventive fungicide application",
  ],
  confidence: 89.1,
}

export function AIModelResults() {
  const [selectedModel, setSelectedModel] = useState<string>("crop-health-cnn")
  const [showDetails, setShowDetails] = useState(false)

  const currentModel = modelResults.find((m) => m.id === selectedModel)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary text-primary-foreground"
      case "processing":
        return "bg-accent text-accent-foreground"
      case "completed":
        return "bg-secondary text-secondary-foreground"
      case "error":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Activity className="h-3 w-3" />
      case "processing":
        return <Clock className="h-3 w-3" />
      case "completed":
        return <CheckCircle2 className="h-3 w-3" />
      case "error":
        return <AlertTriangle className="h-3 w-3" />
      default:
        return <Eye className="h-3 w-3" />
    }
  }

  return (
    <Card className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              {"AI Model Results"}
            </CardTitle>
            <CardDescription>{"Real-time analysis from machine learning models"}</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)}>
            <BarChart3 className="h-4 w-4 mr-2" />
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Model Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {modelResults.map((model) => (
            <Card
              key={model.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedModel === model.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedModel(model.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">{model.name}</h4>
                  <Badge className={`text-xs ${getStatusColor(model.status)}`}>
                    {getStatusIcon(model.status)}
                    <span className="ml-1 capitalize">{model.status}</span>
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span className="font-medium">{model.accuracy}%</span>
                  </div>
                  <Progress value={model.accuracy} className="h-1" />
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-medium">{model.confidence}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{model.lastRun}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Model Results */}
        {currentModel && (
          <Tabs defaultValue="predictions" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="predictions">{"Predictions"}</TabsTrigger>
              <TabsTrigger value="metrics">{"Performance"}</TabsTrigger>
              <TabsTrigger value="ensemble">{"Ensemble"}</TabsTrigger>
            </TabsList>

            <TabsContent value="predictions" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{currentModel.name} - Latest Results</h3>
                <Badge variant="outline" className="text-xs">
                  <Zap className="h-3 w-3 mr-1" />
                  {currentModel.type}
                </Badge>
              </div>

              {/* Crop Health CNN Results */}
              {currentModel.id === "crop-health-cnn" && (
                <div className="space-y-3">
                  {currentModel.predictions.map((pred: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            pred.class === "Healthy"
                              ? "bg-primary"
                              : pred.class === "Stressed"
                                ? "bg-accent"
                                : "bg-destructive"
                          }`}
                        />
                        <span className="text-sm font-medium">{pred.class}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{pred.area}</div>
                        <div className="text-xs text-muted-foreground">
                          {(pred.probability * 100).toFixed(1)}% confidence
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Soil Analysis RF Results */}
              {currentModel.id === "soil-analysis-rf" && (
                <div className="space-y-3">
                  {currentModel.predictions.map((pred: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="text-sm font-medium">{pred.parameter}</div>
                        <div className="text-xs text-muted-foreground">Range: {pred.range}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{pred.value}</div>
                        <Badge variant={pred.status === "optimal" ? "secondary" : "outline"} className="text-xs">
                          {pred.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pest Detection SVM Results */}
              {currentModel.id === "pest-detection-svm" && (
                <div className="space-y-3">
                  {currentModel.predictions.map((pred: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="text-sm font-medium">{pred.pest}</div>
                        <div className="text-xs text-muted-foreground">{pred.location}</div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            pred.risk === "low" ? "secondary" : pred.risk === "medium" ? "outline" : "destructive"
                          }
                          className="text-xs mb-1"
                        >
                          {pred.risk} risk
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {(pred.probability * 100).toFixed(1)}% probability
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{"Model Performance Metrics"}</h3>
                <Badge variant="secondary" className="text-xs">
                  <Target className="h-3 w-3 mr-1" />
                  {"Validated"}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {(currentModel.metrics.precision * 100).toFixed(1)}%
                    </div>
                    <p className="text-xs text-muted-foreground">Precision</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {(currentModel.metrics.recall * 100).toFixed(1)}%
                    </div>
                    <p className="text-xs text-muted-foreground">Recall</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {(currentModel.metrics.f1Score * 100).toFixed(1)}%
                    </div>
                    <p className="text-xs text-muted-foreground">F1-Score</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ensemble" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{"Ensemble Model Insights"}</h3>
                <Badge variant="secondary" className="text-xs">
                  <Layers className="h-3 w-3 mr-1" />
                  {"Combined Analysis"}
                </Badge>
              </div>

              <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold">Overall Health Score</h4>
                      <p className="text-sm text-muted-foreground">Combined assessment from all models</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{ensembleResults.overallHealth}%</div>
                      <Badge variant="secondary" className="text-xs">
                        {ensembleResults.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                  <Progress value={ensembleResults.overallHealth} className="h-2" />
                </CardContent>
              </Card>

              <div className="space-y-3">
                <h4 className="text-sm font-medium">{"AI Recommendations"}</h4>
                {ensembleResults.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
