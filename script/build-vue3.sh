echo "Starting Vue 3 build...";

rm -rf ./dist/vue3 && \
mkdir -p ./dist/vue3/ && cp -r ./src/entry-vue3.ts ./dist/vue3/index.ts && \
mkdir -p ./dist/vue3/assets && cp -r ./src/assets ./dist/vue3/ && \
mkdir -p ./dist/vue3/core && cp -r ./src/core ./dist/vue3/

if [ $? -ne 0 ]
then
    echo "Vue 3 build failed!"
else
    echo "Vue 3 build completed successfully!"
fi
