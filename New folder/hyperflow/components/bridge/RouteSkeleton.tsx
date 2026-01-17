'use client';

import { Skeleton } from '../ui/Skeleton';

export function RouteSkeleton() {
	return (
		<div className="space-y-3">
			{[1, 2, 3].map((index) => (
				<div key={index} className="rounded-xl border-2 border-gray-200 p-4">
					<div className="mb-3 flex items-start justify-between">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-4 w-16" />
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Skeleton className="mb-2 h-3 w-12" />
							<Skeleton className="h-5 w-20" />
						</div>
						<div>
							<Skeleton className="mb-2 h-3 w-12" />
							<Skeleton className="h-5 w-16" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
