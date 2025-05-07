export function fetchTimeout(ms?: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms || 4000);
  });
}
