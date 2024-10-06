export function catchError(error: unknown) {
  if (error && typeof error === "object" && "data" in error) {
    const err = error as { data: { message: string } };

    console.error(err.data.message, { position: "bottom-right" });

    return err.data.message;
  } else if (error instanceof Error && error.message) {
    console.error(error.message, { position: "bottom-right" });

    return error.message;
  } else {
    const defaultMessage = "An unexpected error occurred. Please try again.";
    console.error(defaultMessage, { position: "bottom-right" });

    return defaultMessage;
  }
}
