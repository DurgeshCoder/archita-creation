"use client";

import { useState, useRef, useEffect } from "react";
import {
  UploadCloud,
  X,
  Loader2,
  FolderTree,
  FolderOpen,
  Edit3,
  RefreshCw,
  Plus,
} from "lucide-react";

interface ImageKitUploaderProps {
  value: string[];
  onChange: (images: string[]) => void;
  maxFiles?: number;
  folder?: string;
  label?: string;
  onFolderChange?: (newFolder: string) => void;
}

export default function ImageKitUploader({
  value = [],
  onChange,
  maxFiles = 6,
  folder: initialFolder = "/archita-creation/products",
  label = "Upload Images via ImageKit CDN",
  onFolderChange,
}: ImageKitUploaderProps) {
  const [currentFolder, setCurrentFolder] = useState(initialFolder);
  const [isEditingFolder, setIsEditingFolder] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [customUrlInput, setCustomUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentFolder(initialFolder);
  }, [initialFolder]);

  const handleFolderUpdate = (newFolder: string) => {
    const formatted = newFolder.startsWith("/") ? newFolder : `/${newFolder}`;
    setCurrentFolder(formatted);
    if (onFolderChange) onFolderChange(formatted);
  };

  const handleTriggerPicker = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    // If single image mode, replace current image
    if (maxFiles === 1) {
      // Allow uploading 1 replacement file
    } else if (value.length + files.length > maxFiles) {
      setErrorMessage(`You can only upload up to ${maxFiles} images.`);
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);

    const newUploadedUrls: string[] = [];
    const filesToUpload = maxFiles === 1 ? [files[0]] : Array.from(files);

    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", currentFolder);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Upload failed");
        }

        const data = await res.json();
        if (data.url) {
          newUploadedUrls.push(data.url);
        }
      } catch (err: any) {
        console.error("Upload error:", err);
        setErrorMessage(err.message || "Failed to upload image.");
      }
    }

    if (newUploadedUrls.length > 0) {
      if (maxFiles === 1) {
        // Replace with the newly selected image
        onChange([newUploadedUrls[0]]);
      } else {
        onChange([...value, ...newUploadedUrls]);
      }
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddCustomUrl = () => {
    if (!customUrlInput.trim()) return;
    if (maxFiles === 1) {
      onChange([customUrlInput.trim()]);
    } else {
      if (value.length >= maxFiles) {
        setErrorMessage(`Maximum of ${maxFiles} images reached.`);
        return;
      }
      onChange([...value, customUrlInput.trim()]);
    }
    setCustomUrlInput("");
    setShowUrlInput(false);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updated = value.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  const handleSetPrimary = (indexToPrimary: number) => {
    if (indexToPrimary === 0) return;
    const selected = value[indexToPrimary];
    const filtered = value.filter((_, idx) => idx !== indexToPrimary);
    onChange([selected, ...filtered]);
  };

  return (
    <div className="space-y-3.5">
      {/* Hidden File Input (Always accessible via Ref click) */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={maxFiles > 1}
        className="hidden"
        onChange={(e) => handleFileUpload(e.target.files)}
        disabled={isUploading}
      />

      {/* Label and Folder Info Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-2.5">
        <div>
          <label className="block text-sm font-semibold text-luxury-dark dark:text-luxury-light">
            {label}{" "}
            <span className="text-xs text-neutral-500 font-normal">
              ({value.length}/{maxFiles} {maxFiles === 1 ? "image" : "images"})
            </span>
          </label>
        </div>

        {/* ImageKit Destination Folder Badge & Editor */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary/10 dark:bg-secondary/20 border border-secondary/30 rounded-lg text-secondary dark:text-secondary-light text-[11px] font-mono">
            <FolderTree className="w-3.5 h-3.5 shrink-0" />
            <span className="font-semibold text-[10px] uppercase text-neutral-500 mr-0.5">
              Folder:
            </span>
            <span>{currentFolder}</span>
            <button
              type="button"
              onClick={() => setIsEditingFolder(!isEditingFolder)}
              className="ml-1 text-secondary hover:text-secondary-dark font-sans text-[10px] underline"
            >
              <Edit3 className="w-3 h-3 inline" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-xs text-secondary hover:text-secondary-dark font-medium transition-colors"
          >
            {showUrlInput ? "Hide URL" : "+ Add URL"}
          </button>
        </div>
      </div>

      {/* Folder Name Editor (Custom Folder Input & Quick Presets) */}
      {isEditingFolder && (
        <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-luxury-dark dark:text-luxury-light flex items-center gap-1.5">
              <FolderOpen className="w-4 h-4 text-secondary" /> Set ImageKit Storage Folder Path
            </span>
            <button
              type="button"
              onClick={() => setIsEditingFolder(false)}
              className="text-[11px] text-neutral-400 hover:text-neutral-600"
            >
              Done
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="/archita-creation/products/bedsheets"
              value={currentFolder}
              onChange={(e) => handleFolderUpdate(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg font-mono text-xs focus:outline-none focus:ring-2 focus:ring-secondary/40"
            />
          </div>

          {/* Preset Folder Shortcuts */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[10px] text-neutral-400 self-center">Presets:</span>
            {[
              "/archita-creation/products/bedsheets",
              "/archita-creation/products/blankets",
              "/archita-creation/products/comforters",
              "/archita-creation/products/dohars",
              "/archita-creation/products/bedding-sets",
              "/archita-creation/categories",
              "/archita-creation/collections",
            ].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleFolderUpdate(preset)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  currentFolder === preset
                    ? "bg-secondary text-white font-bold"
                    : "bg-neutral-200/70 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300"
                }`}
              >
                {preset.replace("/archita-creation/", "")}
              </button>
            ))}
          </div>
        </div>
      )}

      {showUrlInput && (
        <div className="flex gap-2 p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <input
            type="url"
            placeholder="Paste ImageKit or external image URL (e.g., https://ik.imagekit.io/...)"
            value={customUrlInput}
            onChange={(e) => setCustomUrlInput(e.target.value)}
            className="flex-1 px-3 py-1.5 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50"
          />
          <button
            type="button"
            onClick={handleAddCustomUrl}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-secondary hover:bg-secondary-dark rounded-md transition-colors"
          >
            Add Image
          </button>
        </div>
      )}

      {/* Upload Dropzone / Trigger Area */}
      <div
        onClick={handleTriggerPicker}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          handleFileUpload(e.dataTransfer.files);
        }}
        className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
          isUploading
            ? "border-secondary bg-secondary/5 cursor-wait"
            : isDragOver
            ? "border-secondary bg-secondary/10 scale-[1.01]"
            : "border-neutral-300 dark:border-neutral-700 hover:border-secondary dark:hover:border-secondary bg-neutral-50/50 dark:bg-neutral-900/40"
        }`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center justify-center space-y-2 py-2">
            <Loader2 className="w-8 h-8 text-secondary animate-spin" />
            <p className="text-sm font-medium text-luxury-dark dark:text-luxury-light">
              Uploading to ImageKit: <span className="font-mono text-xs text-secondary">{currentFolder}</span>...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-11 h-11 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-luxury-dark dark:text-luxury-light">
                <span className="text-secondary font-semibold hover:underline">
                  {maxFiles === 1 && value.length > 0
                    ? "Click to choose a replacement image"
                    : "Click to select image file"}
                </span>{" "}
                or drag & drop
              </p>
              <p className="text-xs text-neutral-500">
                Direct ImageKit upload to: <span className="font-mono text-[11px] text-secondary font-medium">{currentFolder}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {errorMessage && (
        <p className="text-xs text-red-500 font-medium">{errorMessage}</p>
      )}

      {/* Uploaded Images Preview Grid */}
      {value.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">
              {maxFiles === 1 ? "Current Selected Image:" : "Uploaded Images:"}
            </span>
            {maxFiles === 1 && (
              <button
                type="button"
                onClick={handleTriggerPicker}
                className="text-xs text-secondary hover:text-secondary-dark font-medium flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Replace Image
              </button>
            )}
          </div>

          <div
            className={`grid gap-3 ${
              maxFiles === 1
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
            }`}
          >
            {value.map((url, idx) => (
              <div
                key={idx}
                className={`relative group rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 ${
                  maxFiles === 1 ? "aspect-video max-h-48" : "aspect-square"
                }`}
              >
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Primary badge */}
                {idx === 0 && maxFiles > 1 && (
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-secondary text-white text-[10px] font-bold rounded shadow-sm">
                    Primary
                  </span>
                )}

                {/* Hover actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2.5">
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleTriggerPicker(e);
                      }}
                      className="p-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-[10px] flex items-center gap-1"
                      title="Replace this image"
                    >
                      <RefreshCw className="w-3 h-3" /> Replace
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveImage(idx);
                      }}
                      className="p-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {idx !== 0 && maxFiles > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSetPrimary(idx);
                      }}
                      className="w-full py-1 text-[11px] font-medium text-white bg-black/70 hover:bg-secondary rounded transition-colors text-center"
                    >
                      Set as Primary
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
