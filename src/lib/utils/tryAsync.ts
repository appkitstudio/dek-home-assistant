import extractErrorMessage from "./extractErrorMessage";

const tryAsync = async <T>(
  cb: () => Promise<T>,
  description?: string,
  errcb?: (msg: string, err: unknown) => void
): Promise<T | undefined> => {
  try {
    return await cb();
  } catch (err) {
    const msg = description || "General error";
    if (errcb) {
      errcb(`${msg}: ${extractErrorMessage(err)}`, err);
    }
    console.error(`${msg}: ${extractErrorMessage(err)}`);
  }
};

export default tryAsync;
