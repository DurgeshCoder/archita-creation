import ImageKit from "imagekit";

let imagekitInstance: ImageKit | null = null;

export function getImageKit(): ImageKit {
  if (!imagekitInstance) {
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || "";
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || "";
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || "";

    if (!publicKey || !privateKey || !urlEndpoint) {
      console.warn("⚠️ ImageKit credentials are not fully configured in environment variables.");
    }

    imagekitInstance = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });
  }

  return imagekitInstance;
}

export interface ImageKitUploadResult {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  height?: number;
  width?: number;
  size?: number;
  filePath?: string;
}

/**
 * Sanitizes a filename to prevent malformed characters, spaces, and duplicate collisions
 */
export function sanitizeFileName(originalName: string): string {
  if (!originalName) return `upload-${Date.now()}.jpg`;

  const lastDot = originalName.lastIndexOf(".");
  let nameWithoutExt = lastDot !== -1 ? originalName.substring(0, lastDot) : originalName;
  const ext = lastDot !== -1 ? originalName.substring(lastDot).toLowerCase() : ".jpg";

  // Clean filename: lowercase, replace spaces & special chars with hyphens
  const cleanName = nameWithoutExt
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-");

  return `${cleanName || "image"}${ext}`;
}

/**
 * Uploads a file (base64 string, URL, or buffer) to ImageKit
 * Duplicate Handling Strategy:
 * 1. `useUniqueFileName: true` -> ImageKit generates a unique suffix (e.g. bedsheet_abc123.jpg)
 * 2. `overwriteFile: false` -> Existing files with identical names are never overwritten
 * 3. File names are sanitized before sending to ensure clean CDN paths
 */
export async function uploadToImageKit(
  file: string | Buffer,
  fileName: string,
  folder: string = "/archita-creation"
): Promise<ImageKitUploadResult> {
  const ik = getImageKit();
  
  // Format folder path cleanly (e.g., "/archita-creation/products/bedsheets")
  const cleanFolder = folder.startsWith("/") ? folder : `/${folder}`;
  const cleanFileName = sanitizeFileName(fileName);
  
  const response = await ik.upload({
    file,
    fileName: cleanFileName,
    folder: cleanFolder,
    useUniqueFileName: true, // ImageKit automatically creates unique filename variants (e.g. image_qE9.jpg)
    overwriteFile: false,     // Ensures existing files are never overwritten
  });

  return {
    fileId: response.fileId,
    name: response.name,
    url: response.url,
    thumbnailUrl: response.thumbnailUrl,
    height: response.height,
    width: response.width,
    size: response.size,
    filePath: response.filePath,
  };
}

/**
 * Deletes a file from ImageKit by fileId
 */
export async function deleteFromImageKit(fileId: string): Promise<boolean> {
  try {
    const ik = getImageKit();
    await ik.deleteFile(fileId);
    return true;
  } catch (error) {
    console.error("Failed to delete file from ImageKit:", error);
    return false;
  }
}
