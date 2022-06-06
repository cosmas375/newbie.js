npm run build && \
cp ./package-npm.json ./dist/package.json && \
cp ./README.md ./dist/README.md && \
cd dist && \
npm publish --access=public
