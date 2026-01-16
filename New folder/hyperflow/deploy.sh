#!/bin/bash

echo "🚀 Deploying HyperFlow..."

echo "📦 Building..."
npm run build

if [ $? -ne 0 ]; then
	echo "❌ Build failed!"
	exit 1
fi

echo "☁️  Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "📱 Test on mobile device"
echo "🎥 Record demo video"
echo "📝 Submit to hackathon"
