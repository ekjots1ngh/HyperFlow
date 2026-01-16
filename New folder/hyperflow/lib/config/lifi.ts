import { createConfig } from '@lifi/sdk';

// Shared LI.FI configuration for API requests
export const lifiConfig = createConfig({
	integrator: 'hyperflow',
	apiUrl: 'https://li.quest/v1',
});
