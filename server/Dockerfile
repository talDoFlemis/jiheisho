# Stage 1: Build stage (installs dependencies)
FROM python:3.11-slim AS builder
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Set the working directory
WORKDIR /app

# Copy only the dependency files to leverage Docker layer caching
COPY pyproject.toml ./

RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --no-install-project

# Install dependencies in a virtual environment

COPY . .

RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync

# Stage 2: Final runtime image
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Copy installed dependencies from builder stage
COPY --from=builder --chown=app:app /app/.venv /app/.venv
COPY . .

# Copy the application code

ENV MODEL_PATH=/app/trained_model.keras

# Expose the port FastAPI will run on
EXPOSE 8000

# Command to run the FastAPI server
CMD ["/app/.venv/bin/uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
