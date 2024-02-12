echo "Starting Vue 2 build...";

rm -rf ./dist/vue2 && \
mkdir -p ./dist/vue2/ && cp -r ./src/entry-vue2.ts ./dist/vue2/index.ts && \
mkdir -p ./dist/vue2/assets && cp -r ./src/assets ./dist/vue2/ && \
mkdir -p ./dist/vue2/core && cp -r ./src/core ./dist/vue2/

if [ $? -ne 0 ]
then
    echo "Vue 2 build failed!"
else
    echo "Vue 2 build completed successfully!"
fi
