emcc mergeSort.c -s WASM=1 -s MODULARIZE=1 -s ALLOW_MEMORY_GROWTH=1 -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall"]' -o mergeSortModule.js
