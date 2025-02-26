type ClassificationRequest = {
	file: File;
};

export type PrimateClass =
	| "Bald Uakari"
	| "Emperor Tamarin"
	| "Golden Monkey"
	| "Gray Langur"
	| "Hamadryas Baboon"
	| "Mandril"
	| "Proboscis Monkey"
	| "Red Howler"
	| "Vervet Monkey"
	| "White Faced Saki";

type ClassificationResponse = {
	predictions: {
		[K in PrimateClass]: number; // Mapped type ensuring all primate classes are present
	};
	highest_confidence_class: PrimateClass;
};

export async function classify(
	req: ClassificationRequest,
): Promise<ClassificationResponse> {
	const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

	try {
		const formData = new FormData();
		formData.append("file", req.file);

		const response = await fetch(`${API_URL}/predict`, {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error(`Classification failed: ${response.statusText}`);
		}

		const result = await response.json();

		// Validate the response matches our expected type
		if (!result.predictions || !result.highest_confidence_class) {
			throw new Error("Invalid response format from classification service");
		}

		// Type assertion since we've validated the structure
		return result as ClassificationResponse;
	} catch (error) {
		console.error("Classification error:", error);
		throw error instanceof Error
			? error
			: new Error("Failed to classify image");
	}
}
