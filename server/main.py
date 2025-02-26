from fastapi import FastAPI, File, UploadFile
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from typing import Dict

app = FastAPI()
model = tf.keras.models.load_model('../models/trained_model.keras')
IMG_SIZE = (64, 64)  # Adjust based on your model's input size

PRIMATE_CLASSES = [
    'bald_uakari',
    'emperor_tamarin',
    'golden_monkey',
    'gray_langur',
    'hamadryas_baboon',
    'mandril',
    'proboscis_monkey',
    'red_howler',
    'vervet_monkey',
    'white_faced_saki',
]


def format_readable_name(name: str) -> str:
    """Convert snake_case to Title Case with spaces"""
    return ' '.join(word.capitalize() for word in name.split('_'))

def format_predictions(predictions: np.ndarray, precision: int = 4) -> Dict[str, float]:
    # Get the predictions for the first (and only) image
    pred_array = predictions[0]

    # Create a dictionary mapping readable class names to probabilities with specified precision
    return {
        format_readable_name(class_name): round(float(probability), precision)
        for class_name, probability in zip(PRIMATE_CLASSES, pred_array)
    }


def preprocess_image(image_bytes):
	image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
	image = image.resize(IMG_SIZE)
	image = np.array(image) / 255.0  # Normalize if required
	image = np.expand_dims(image, axis=0)  # Add batch dimension
	return image


@app.post('/predict')
async def predict(file: UploadFile = File(...), precision: int = 4):
	image_bytes = await file.read()
	image = preprocess_image(image_bytes)
	prediction = model.predict(image)

	formatted_predictions = format_predictions(prediction, precision)

	return {
		'predictions': formatted_predictions,
		'highest_confidence_class': max(formatted_predictions.items(), key=lambda x: x[1])[0],
	}
