export interface Achievement {
	id: string;
	name: string;
	description: string;
	icon: string;
	unlocked: boolean;
	progress: number;
	maxProgress: number;
	reward?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
	{
		id: 'first_bridge',
		name: 'First Steps',
		description: 'Complete your first bridge to Hyperliquid',
		icon: '🎯',
		unlocked: false,
		progress: 0,
		maxProgress: 1,
		reward: 'Welcome to HyperFlow!',
	},
	{
		id: 'speed_demon',
		name: 'Speed Demon',
		description: 'Bridge completed in under 60 seconds',
		icon: '⚡',
		unlocked: false,
		progress: 0,
		maxProgress: 1,
		reward: 'Lightning fast!',
	},
	{
		id: 'whale',
		name: 'Whale Status',
		description: 'Bridge over $10,000 in a single transaction',
		icon: '🐋',
		unlocked: false,
		progress: 0,
		maxProgress: 10_000,
		reward: 'Big moves!',
	},
	{
		id: 'gas_saver',
		name: 'Gas Optimizer',
		description: 'Save $10+ in gas fees with smart routing',
		icon: '💰',
		unlocked: false,
		progress: 0,
		maxProgress: 10,
		reward: 'Efficiency master!',
	},
	{
		id: 'frequent_flyer',
		name: 'Frequent Flyer',
		description: 'Complete 10 bridges',
		icon: '🚀',
		unlocked: false,
		progress: 0,
		maxProgress: 10,
		reward: 'HyperFlow veteran!',
	},
	{
		id: 'meme_lord',
		name: 'Meme Lord',
		description: 'Bridge exactly $420.69',
		icon: '😎',
		unlocked: false,
		progress: 0,
		maxProgress: 1,
		reward: 'You are a legend!',
	},
];

export function checkAchievement(achievementId: string, progress: number): Achievement | null {
	const achievement = ACHIEVEMENTS.find((entry) => entry.id === achievementId);
	if (!achievement) {
		return null;
	}

	if (progress >= achievement.maxProgress && !achievement.unlocked) {
		return { ...achievement, unlocked: true, progress };
	}

	return null;
}
