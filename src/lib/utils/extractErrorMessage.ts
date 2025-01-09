export default function extractErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : JSON.stringify(err);
}
