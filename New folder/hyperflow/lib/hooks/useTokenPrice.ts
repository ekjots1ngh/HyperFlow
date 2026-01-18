import { useEffect, useState } from 'react';

type TokenMetadata = {
  symbol?: string;
  name?: string;
  decimals?: number;
};

interface UseTokenPriceResult {
  priceUSD: number | null;
  tokenMeta: TokenMetadata | null;
  isLoading: boolean;
  error: string | null;
}

const LIFI_TOKEN_ENDPOINT = 'https://li.quest/v1/token' as const;

export function useTokenPrice(tokenAddress?: string, chainId?: number): UseTokenPriceResult {
  const [priceUSD, setPriceUSD] = useState<number | null>(null);
  const [tokenMeta, setTokenMeta] = useState<TokenMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tokenAddress || !chainId) {
      setPriceUSD(null);
      setTokenMeta(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    const fetchTokenPrice = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const apiKey = process.env.NEXT_PUBLIC_LIFI_API_KEY;
        if (!apiKey) {
          throw new Error('Missing NEXT_PUBLIC_LIFI_API_KEY environment variable');
        }

        const params = new URLSearchParams({
          chain: String(chainId),
          token: tokenAddress,
        });

        const response = await fetch(`${LIFI_TOKEN_ENDPOINT}?${params.toString()}`, {
          headers: {
            'x-lifi-api-key': apiKey,
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch token price (status ${response.status})`);
        }

        const data = await response.json();
        const token = data.tokens?.[0];

        if (!token) {
          throw new Error('Token data unavailable in response');
        }

        const parsedPrice = Number.parseFloat(token.priceUSD ?? '0');
        setPriceUSD(Number.isFinite(parsedPrice) ? parsedPrice : null);
        setTokenMeta({
          symbol: token.symbol,
          name: token.name,
          decimals: typeof token.decimals === 'number' ? token.decimals : undefined,
        });
      } catch (fetchError) {
        if ((fetchError as Error).name === 'AbortError') {
          return;
        }

        setError(fetchError instanceof Error ? fetchError.message : 'Unknown error while fetching token price');
        setPriceUSD(null);
        setTokenMeta(null);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchTokenPrice();

    return () => {
      controller.abort();
    };
  }, [tokenAddress, chainId]);

  return { priceUSD, tokenMeta, isLoading, error };
}
