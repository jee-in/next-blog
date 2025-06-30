#!/bin/bash

set -a
source .env
set +a

REVALIDATE_SECRET=$1  
PATH_TO_REVALIDATE=${2:-"/"}

show_usage() {
  echo "Usage: $0 <revalidate-secret> [path-to-revalidate]"
  echo "  revalidate-secret   : x-revalidate-secret 헤더에 들어갈 값"
  echo "  path-to-revalidate  : 렌더링할 경로 (기본값: /)"
}

if [ -z "$REVALIDATE_SECRET" ]; then
  echo "Error: REVALIDATE_SECRET is required."
  show_usage
  exit 1
fi

if [ -z "$URL" ]; then
  echo "Error: REVALIDATE_URL is not set in .env."
  exit 1
fi

if [ -z "$PATH_TO_REVALIDATE" ]; then
  echo "Error: PATH_TO_REVALIDATE is empty."
  exit 1
fi

response=$(curl -s -L -w "\n%{http_code}" -X POST "$URL/api/revalidate" \
  -H "Content-Type: application/json" \
  -H "x-revalidate-secret: $REVALIDATE_SECRET" \
  -d "{\"path\":\"$PATH_TO_REVALIDATE\"}")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
  echo "Revalidate Success! Response:"
  echo "$body"
else
  echo "Revalidate Failed with status $http_code. Response:"
  echo "$body"
fi