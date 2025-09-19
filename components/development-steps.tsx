"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Database,
  ImageIcon,
  Brain,
  Server,
  Monitor,
  CheckCircle2,
  Clock,
  AlertCircle,
  Play,
  Pause,
  ChevronDown,
  ChevronRight,
  GitBranch,
  Code,
  TestTube,
} from "lucide-react"

interface DevelopmentStep {
  id: string
  title: string
  description: string
  icon: any
  status: "completed" | "in-progress" | "pending" | "error"
  progress: number
  duration: string
  details: string[]
  dependencies: string[]
  technologies: string[]
}

const developmentSteps: DevelopmentStep[] = [
  {
    id: "data-collection",
    title: "Data Collection",
    description: "Sentinel-2, synthetic sensor data",
    icon: Database,
    status: "completed",
    progress: 100,
    duration: "2 weeks",
    details: [
      "Satellite imagery acquisition from Sentinel-2",
      "Synthetic sensor data generation",
      "Data validation and quality checks",
      "Storage infrastructure setup",
    ],
    dependencies: [],
    technologies: ["Sentinel-2 API", "Python", "PostgreSQL", "AWS S3"],
  },
  {
    id: "preprocessing",
    title: "Preprocessing",
    description: "Image and sensor data cleaning",
    icon: ImageIcon,
    status: "completed",
    progress: 100,
    duration: "3 weeks",
    details: [
      "Image normalization and calibration",
      "Noise reduction algorithms",
      "Data segmentation (K-Means/U-Net)",
      "NDVI/EVI extraction pipeline",
    ],
    dependencies: ["data-collection"],
    technologies: ["OpenCV", "scikit-image", "NumPy", "TensorFlow"],
  },
  {
    id: "model-development",
    title: "Model Development",
    description: "Train crop, soil, pest models",
    icon: Brain,
    status: "in-progress",
    progress: 75,
    duration: "4 weeks",
    details: [
      "CNN architecture for crop health analysis",
      "Random Forest for soil condition prediction",
      "SVM implementation for pest detection",
      "Model validation and hyperparameter tuning",
    ],
    dependencies: ["preprocessing"],
    technologies: ["TensorFlow", "PyTorch", "scikit-learn", "Keras"],
  },
  {
    id: "api-development",
    title: "API Development",
    description: "FastAPI/Flask endpoints",
    icon: Server,
    status: "pending",
    progress: 25,
    duration: "2 weeks",
    details: [
      "RESTful API design and implementation",
      "Authentication and authorization",
      "Data upload and processing endpoints",
      "Real-time inference services",
    ],
    dependencies: ["model-development"],
    technologies: ["FastAPI", "Flask", "Redis", "Docker"],
  },
  {
    id: "frontend-integration",
    title: "Frontend Integration",
    description: "React.js with 3D visualizations",
    icon: Monitor,
    status: "in-progress",
    progress: 60,
    duration: "3 weeks",
    details: [
      "Interactive dashboard development",
      "3D visualization components (Plotly.js)",
      "Geospatial mapping (Leaflet.js)",
      "Real-time data streaming",
    ],
    dependencies: ["api-development"],
    technologies: ["React.js", "Next.js", "Plotly.js", "Leaflet.js"],
  },
  {
    id: "testing-integration",
    title: "Testing & Integration",
    description: "End-to-end system validation",
    icon: TestTube,
    status: "pending",
    progress: 0,
    duration: "2 weeks",
    details: [
      "Unit and integration testing",
      "Performance optimization",
      "User acceptance testing",
      "Deployment and monitoring setup",
    ],
    dependencies: ["frontend-integration"],
    technologies: ["Jest", "Cypress", "Docker", "Kubernetes"],
  },
]

export function DevelopmentSteps() {
  const [expandedStep, setExpandedStep] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("pipeline")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
      case "in-progress":
        return <Play className="h-4 w-4" />
      case "error":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-primary text-primary-foreground"
      case "in-progress":
        return "bg-accent text-accent-foreground animate-pulse"
      case "error":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const completedSteps = developmentSteps.filter((step) => step.status === "completed").length
  const totalSteps = developmentSteps.length
  const overallProgress = Math.round((completedSteps / totalSteps) * 100)

  const currentStep = developmentSteps.find((step) => step.status === "in-progress")

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-primary" />
              {"Development Pipeline"}
            </CardTitle>
            <CardDescription>{"System development and integration progress"}</CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            {completedSteps}/{totalSteps} Complete
          </Badge>
        </div>

        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pipeline">{"Pipeline"}</TabsTrigger>
            <TabsTrigger value="current">{"Current"}</TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="space-y-3 mt-4">
            {developmentSteps.map((step, index) => (
              <div key={step.id} className="space-y-2">
                {/* Step Header */}
                <div
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                >
                  {/* Connection Line */}
                  {index < developmentSteps.length - 1 && <div className="absolute left-8 mt-12 w-0.5 h-8 bg-border" />}

                  {/* Status Icon */}
                  <div className={`rounded-full p-2 relative z-10 ${getStatusColor(step.status)}`}>
                    {getStatusIcon(step.status)}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium">{step.title}</h4>
                      <Badge
                        variant={
                          step.status === "completed"
                            ? "default"
                            : step.status === "in-progress"
                              ? "secondary"
                              : step.status === "error"
                                ? "destructive"
                                : "outline"
                        }
                        className="text-xs"
                      >
                        {step.status === "completed"
                          ? "Done"
                          : step.status === "in-progress"
                            ? "Active"
                            : step.status === "error"
                              ? "Error"
                              : "Pending"}
                      </Badge>
                      {expandedStep === step.id ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{step.description}</p>

                    {/* Progress Bar */}
                    {step.status !== "pending" && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{step.progress}%</span>
                        </div>
                        <Progress value={step.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedStep === step.id && (
                  <div className="ml-12 p-4 bg-muted/30 rounded-lg animate-fade-in-up">
                    <div className="space-y-4">
                      {/* Details */}
                      <div>
                        <h5 className="text-xs font-medium text-muted-foreground mb-2">TASKS</h5>
                        <ul className="space-y-1">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="text-xs flex items-start gap-2">
                              <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h5 className="text-xs font-medium text-muted-foreground mb-2">TECHNOLOGIES</h5>
                        <div className="flex flex-wrap gap-1">
                          {step.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              <Code className="h-3 w-3 mr-1" />
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Duration: {step.duration}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="current" className="space-y-4 mt-4">
            {currentStep ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-3 ${getStatusColor(currentStep.status)}`}>
                    <currentStep.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">{currentStep.title}</h3>
                    <p className="text-sm text-muted-foreground">{currentStep.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current Progress</span>
                    <span className="font-medium">{currentStep.progress}%</span>
                  </div>
                  <Progress value={currentStep.progress} className="h-3" />
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Active Tasks</h4>
                  {currentStep.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          idx < Math.floor(currentStep.details.length * (currentStep.progress / 100))
                            ? "bg-primary"
                            : "bg-muted-foreground"
                        }`}
                      />
                      <span className="text-sm">{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Pause className="h-4 w-4 mr-2" />
                    {"Pause"}
                  </Button>
                  <Button variant="outline" size="sm">
                    {"View Logs"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">No active development step</p>
                <p className="text-xs">All tasks completed or pending</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
