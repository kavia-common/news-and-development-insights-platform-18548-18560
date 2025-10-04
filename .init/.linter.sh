#!/bin/bash
cd /home/kavia/workspace/code-generation/news-and-development-insights-platform-18548-18560/news_aggregator_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

