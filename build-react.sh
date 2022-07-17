echo "Starting React build...";

rm -rf ./dist/react && \
mkdir -p ./dist/react/ && cp -r ./src/entry-react.ts ./dist/react/index.ts && \
mkdir -p ./dist/react/assets && cp -r ./src/assets ./dist/react/ && \
mkdir -p ./dist/react/core && cp -r ./src/core ./dist/react/

if [ $? -ne 0 ]
then
    echo "React build failed!"
else
    echo "React build completed successfully!"
fi
