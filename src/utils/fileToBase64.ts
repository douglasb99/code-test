export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      {
        reject("File cannot be read as string");
      }
    };
    reader.onerror = (error) => reject(error);
  });
}
