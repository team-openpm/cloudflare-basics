// Taken from https://github.com/lukeed/worktop/tree/master
// MIT License Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)

type Arrayable<T> = T | Array<T>
type DataObject = Record<string, Arrayable<FormDataEntryValue>>

export function toObject(
  iter: Headers | FormData | URLSearchParams
): DataObject {
  let key, val, tmp: Arrayable<FormDataEntryValue>
  const out: DataObject = {}

  for ([key, val] of iter) {
    out[key] =
      (tmp = out[key]) !== void 0
        ? ([] as FormDataEntryValue[]).concat(tmp, val)
        : val
  }

  return out
}
