import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import { uploadToImageKit } from "@/lib/imagekit";

export async function POST(req: NextRequest) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const folder = (formData.get("folder") as string) || "/archita-creation/products";

      if (!file) {
        return NextResponse.json({ error: "No file provided in form data" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = file.name || `upload-${Date.now()}.jpg`;

      // Check if ImageKit keys are present
      if (process.env.IMAGEKIT_PRIVATE_KEY && !process.env.IMAGEKIT_PRIVATE_KEY.includes("example")) {
        const uploadResult = await uploadToImageKit(buffer, fileName, folder);
        return NextResponse.json({
          success: true,
          ...uploadResult,
        });
      } else {
        // Fallback demo upload mode if keys are placeholders
        const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;
        return NextResponse.json({
          success: true,
          fileId: `ik-demo-${Date.now()}`,
          name: fileName,
          url: base64Data, // Data URI preview fallback
          thumbnailUrl: base64Data,
          message: "Uploaded in preview mode (Configure real IMAGEKIT_PRIVATE_KEY in .env for live CDN delivery)",
        });
      }
    } else {
      const body = await req.json();
      const { file, fileName, folder = "/archita-creation" } = body;

      if (!file) {
        return NextResponse.json({ error: "File string/URL is required" }, { status: 400 });
      }

      if (process.env.IMAGEKIT_PRIVATE_KEY && !process.env.IMAGEKIT_PRIVATE_KEY.includes("example")) {
        const uploadResult = await uploadToImageKit(file, fileName || `image-${Date.now()}.jpg`, folder);
        return NextResponse.json({
          success: true,
          ...uploadResult,
        });
      } else {
        return NextResponse.json({
          success: true,
          fileId: `ik-demo-${Date.now()}`,
          name: fileName || "image.jpg",
          url: file,
          thumbnailUrl: file,
          message: "Uploaded in preview mode",
        });
      }
    }
  } catch (error: any) {
    console.error("ImageKit upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to upload image to ImageKit" },
      { status: 500 }
    );
  }
}
