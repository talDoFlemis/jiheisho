import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const file = formData.get("file");

		if (!file || !(file instanceof File)) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 });
		}

		const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

		const apiFormData = new FormData();
		apiFormData.append("file", file);

		const response = await fetch(`${API_URL}/predict`, {
			method: "POST",
			body: apiFormData,
		});

		if (!response.ok) {
			throw new Error(`Classification failed: ${response.statusText}`);
		}

		const result = await response.json();

		if (!result.predictions || !result.highest_confidence_class) {
			throw new Error("Invalid response format from classification service");
		}

		return NextResponse.json(result);
	} catch (error) {
		console.error("Classification error:", error);
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : "Failed to classify image",
			},
			{ status: 500 },
		);
	}
}
