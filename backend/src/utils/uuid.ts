const UUID_MASK = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
export function generateUUID() {
  return UUID_MASK.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
