#include <stdlib.h>
#include <math.h>
#include <emscripten.h>

int *mergeSort(int *input, int start, int end);
int *merge(int *left, int *right, int n, int leftSize, int rightSize);

EMSCRIPTEN_KEEPALIVE
int *mergeSort(int *input, int start, int end)
{
  int n = end - start;
  if (n < 2)
  {
    int *o = malloc(sizeof(int));
    o[0] = input[start];
    return o;
  }

  int half = floor((start + end) / 2);
  int *left = mergeSort(input, start, half);
  int *right = mergeSort(input, half, end);

  int *result = merge(left, right, n, half - start, end - half);
  free(left);
  free(right);

  return result;
}

int *merge(int *left, int *right, int n, int leftSize, int rightSize)
{
  int i = 0;
  int j = 0;
  int k = 0;
  int *output = malloc(sizeof(int) * n);
  int leftEnd = leftSize;
  int rightEnd = rightSize;

  while (i != leftEnd && j != rightEnd)
  {
    if (left[i] <= right[j])
    {
      output[k++] = left[i++];
    }
    else
    {
      output[k++] = right[j++];
    }
  }

  while (i != leftEnd)
  {
    output[k++] = left[i++];
  }

  while (j != rightEnd)
  {
    output[k++] = right[j++];
  }

  return output;
}