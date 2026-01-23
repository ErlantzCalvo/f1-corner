interface FetchOptions {
  timeout?: number;
  retries?: number;
  cache?: boolean;
  backoffMultiplier?: number;
  rateLimitBackoffMultiplier?: number;
  skipRateLimitDelay?: boolean;
}

export async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {},
): Promise<Response> {
  const {
    timeout = 20000,
    retries = 3,
    cache = true,
    backoffMultiplier = 2,
    rateLimitBackoffMultiplier = 5,
    skipRateLimitDelay = false,
  } = options;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const fetchOptions: RequestInit = {
        cache: cache ? "default" : "no-store",
      };

      const response = await fetch(url, {
        signal: controller.signal,
        ...fetchOptions,
      });

      clearTimeout(timeoutId);

      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const delay = retryAfter
          ? Math.min(parseInt(retryAfter) * 1000, 60000)
          : rateLimitBackoffMultiplier ** attempt * 1000;

        if (skipRateLimitDelay) {
          throw new Error(`HTTP 429 Too Many Requests`);
        }

        throw new Error(`HTTP 429 Too Many Requests - retry after ${delay}ms`);
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response;
    } catch (error) {
      lastError = error as Error;
      const isLastAttempt = attempt === retries;

      if (!isLastAttempt) {
        const delay = backoffMultiplier ** attempt * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw new Error(
          `Failed after ${retries + 1} attempts: ${lastError.message}`,
        );
      }
    }
  }

  throw lastError;
}
