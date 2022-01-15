echo "Starting Vue build...";

mkdir -p ./dist/vue/ && cp -r ./src/entry-vue.ts ./dist/vue/index.ts && \
mkdir -p ./dist/vue/assets && cp -r ./src/assets ./dist/vue/ && \
mkdir -p ./dist/vue/core && cp -r ./src/core ./dist/vue/

if [ $? -ne 0 ]
then
    echo "Vue build failed!"
else
    echo "Vue build completed successfully!"
fi
