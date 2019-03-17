window.onload = () => {
  const btn = document.getElementById('button');
  btn.addEventListener('click', startBenchmark);
};

function startBenchmark() {
  const n = 10000000;
  const data = createData(n);

  console.time('js-sort');
  jsMergeSort(data, 0, n);
  console.timeEnd('js-sort');

  Module().then(module => {
    console.time('c-sort');
    const result = cMergeSort(module, data, 0, n);
    console.timeEnd('c-sort');
    module._free(result);
  });
}

function createData(n) {
  const input = new Int32Array(x);
  for (let i = 0; i < n; i++) {
    input[i] = Math.floor(Math.random() * n);
  }
  return input;
}

function cMergeSort(module, input, start, end) {
  let buffer = module._malloc(input.length * input.BYTES_PER_ELEMENT);
  module.HEAP32.set(input, buffer >> 2);
  let result = module.ccall(
    'mergeSort',
    'number',
    ['number', 'number', 'number'],
    [buffer, 0, input.length]
  );
  module._free(buffer);
  return result;
}

function jsMergeSort(input, start, end) {
  var n = end - start;
  if (n < 2) {
    var o = new Array(1);
    o[0] = input[start];
    return o;
  }

  var half = Math.floor((start + end) / 2);
  var left = jsMergeSort(input, start, half);
  var right = jsMergeSort(input, half, end);

  return merge(left, right, n);
}

function merge(left, right, n) {
  var i = 0;
  var j = 0;
  var k = 0;
  var output = new Array(n);
  var leftEnd = left.length;
  var rightEnd = right.length;

  while (i != leftEnd && j != rightEnd) {
    if (left[i] <= right[j]) {
      output[k++] = left[i++];
    } else {
      output[k++] = right[j++];
    }
  }

  while (i != leftEnd) {
    output[k++] = left[i++];
  }

  while (j != rightEnd) {
    output[k++] = right[j++];
  }

  return output;
}
