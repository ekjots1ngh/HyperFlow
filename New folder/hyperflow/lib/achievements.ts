export interface Achievement {
	id: string;
	name: string;
	description: string;
	icon: string;
	unlocked: boolean;
	progress: number;
	maxProgress: number;
}

export const achievements: Achievement[] = [
	{
		id: 'first_bridge',
		name: 'First Steps',
		description: 'Complete your first bridge',
		icon: '🎯',
		unlocked: false,
		progress: 0,
		maxProgress: 1,
	},
	{
		id: 'speed_demon',
		name: 'Speed Demon',
		description: 'Bridge in under 60 seconds',
		icon: '⚡',
		unlocked: false,
		progress: 0,
		maxProgress: 1,
	},
	{
		id: 'whale',
		name: 'Whale Status',
		description: 'Bridge over $10,000',
		icon: '🐋',
		unlocked: false,
		progress: 0,
		maxProgress: 10000,
	},
	{
		id: 'gas_saver',
		name: 'Gas Optimizer',
		description: 'Save $10+ in gas fees',
		icon: '💰',
		unlocked: false,
		progress: 0,
		maxProgress: 10,
	},
];
