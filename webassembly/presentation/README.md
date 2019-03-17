graph LR
A[C/C++] --> B(Clang<br />Front End)
B --> C(LLVM Core<br/>Optimizer)
C --> D(Emscripten<br/>Back End)
D --> E(Binaryen)
E --> F[WebAssembly<br/>WASM]
