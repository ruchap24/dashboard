"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileImage, FileText, CheckCircle2, AlertCircle, X, Cloud, Database } from "lucide-react"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  category: "image" | "sensor"
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  preview?: string
}

export function FileUploadSystem() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    processFiles(files)
  }, [])

  const processFiles = (files: File[]) => {
    files.forEach((file) => {
      const fileId = Math.random().toString(36).substr(2, 9)
      const category = file.type.startsWith("image/") ? "image" : "sensor"

      const newFile: UploadedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        category,
        status: "uploading",
        progress: 0,
      }

      setUploadedFiles((prev) => [...prev, newFile])

      // Simulate upload progress
      simulateUpload(fileId)
    })
  }

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            const newProgress = Math.min(file.progress + Math.random() * 20, 100)

            if (newProgress >= 100) {
              clearInterval(interval)
              return {
                ...file,
                progress: 100,
                status: Math.random() > 0.1 ? "completed" : "error",
              }
            }

            return { ...file, progress: newProgress }
          }
          return file
        }),
      )
    }, 500)
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const imageFiles = uploadedFiles.filter((f) => f.category === "image")
  const sensorFiles = uploadedFiles.filter((f) => f.category === "sensor")

  return (
    <Card className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          {"Data Upload Center"}
        </CardTitle>
        <CardDescription>{"Upload multispectral images (TIFF/PNG) and sensor data files (CSV/JSON)"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer ${
            isDragOver
              ? "border-primary bg-primary/5 scale-105"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <Upload
            className={`h-12 w-12 mx-auto mb-4 transition-colors ${
              isDragOver ? "text-primary" : "text-muted-foreground"
            }`}
          />
          <p className="text-sm text-muted-foreground mb-2">
            {isDragOver ? "Drop files here" : "Drag and drop files here or click to browse"}
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            {"Supports: TIFF, PNG (images) • CSV, JSON (sensor data)"}
          </p>
          <Button variant="outline" size="sm">
            {"Select Files"}
          </Button>
          <input
            id="file-input"
            type="file"
            multiple
            accept=".tiff,.tif,.png,.csv,.json"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Upload Status */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">{"Upload Status"}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  <Cloud className="h-3 w-3 mr-1" />
                  {"Cloud Storage"}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Database className="h-3 w-3 mr-1" />
                  {"API Ready"}
                </Badge>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">
                  {"All Files"} ({uploadedFiles.length})
                </TabsTrigger>
                <TabsTrigger value="images">
                  {"Images"} ({imageFiles.length})
                </TabsTrigger>
                <TabsTrigger value="sensor">
                  {"Sensor Data"} ({sensorFiles.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-2">
                {uploadedFiles.map((file) => (
                  <FileUploadItem key={file.id} file={file} onRemove={removeFile} />
                ))}
              </TabsContent>

              <TabsContent value="images" className="space-y-2">
                {imageFiles.map((file) => (
                  <FileUploadItem key={file.id} file={file} onRemove={removeFile} />
                ))}
              </TabsContent>

              <TabsContent value="sensor" className="space-y-2">
                {sensorFiles.map((file) => (
                  <FileUploadItem key={file.id} file={file} onRemove={removeFile} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Processing Pipeline Status */}
        {uploadedFiles.some((f) => f.status === "completed") && (
          <Card className="bg-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">{"Data Processing Pipeline"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>{"Image Normalization"}</span>
                <Badge variant="secondary">{"Active"}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>{"NDVI/EVI Extraction"}</span>
                <Badge variant="outline">{"Queued"}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>{"Sensor Data Cleaning"}</span>
                <Badge variant="outline">{"Queued"}</Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

function FileUploadItem({ file, onRemove }: { file: UploadedFile; onRemove: (id: string) => void }) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-card border rounded-lg">
      <div className="flex-shrink-0">
        {file.category === "image" ? (
          <FileImage className="h-8 w-8 text-primary" />
        ) : (
          <FileText className="h-8 w-8 text-accent" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-medium truncate">{file.name}</p>
          <Badge variant="outline" className="text-xs">
            {file.category === "image" ? "Image" : "Sensor"}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mb-2">{formatFileSize(file.size)}</p>

        {file.status === "uploading" && (
          <div className="space-y-1">
            <Progress value={file.progress} className="h-1" />
            <p className="text-xs text-muted-foreground">
              {"Uploading... "}
              {Math.round(file.progress)}%
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {file.status === "completed" && <CheckCircle2 className="h-4 w-4 text-primary" />}
        {file.status === "error" && <AlertCircle className="h-4 w-4 text-destructive" />}
        <Button variant="ghost" size="sm" onClick={() => onRemove(file.id)} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
