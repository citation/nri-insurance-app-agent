export default class array {
  static equals = (source, target) => {
    if (!Array.isArray(source) || !Array.isArray(target)) return false;
    if (source.length != target.length) return false;
    if (JSON.stringify(source.sort()) != JSON.stringify(target.sort())) {
      return false;
    }
    return true;
  }
}
