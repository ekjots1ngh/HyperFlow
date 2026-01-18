/**
 * Format a raw token amount into a readable quantity.
 * The input should be expressed in the token's smallest unit (wei-style).
 */
export function formatTokenAmount(amount: string | number, decimals: number = 6): string {
	try {
		const amountStr = typeof amount === 'number' ? amount.toString() : amount;
		const cleanAmount = amountStr.replace(/\./g, '');
		const numericAmount = Number.parseFloat(cleanAmount);

		if (!Number.isFinite(numericAmount) || numericAmount === 0) {
			return '0.00';
		}

		const divisor = 10 ** decimals;
		const formatted = numericAmount / divisor;

		return formatted.toFixed(2);
	} catch (error) {
		console.error('Format error:', error, amount);
		return '0.00';
	}
}

/**
 * Convert a user-friendly token amount into the smallest-unit string.
 */
export function parseTokenAmount(input: string, decimals: number = 6): string {
	const numericInput = Number.parseFloat(input);

	if (!Number.isFinite(numericInput)) {
		return '0';
	}

	const multiplier = 10 ** decimals;
	const result = Math.floor(numericInput * multiplier);

	return result.toString();
}

/**
 * Render a numeric value as USD with standard currency formatting.
 */
export function formatUSD(amount: number | string): string {
	const numeric = typeof amount === 'string' ? Number.parseFloat(amount) : amount;

	if (!Number.isFinite(numeric)) {
		return '$0.00';
	}

	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(numeric);
}
