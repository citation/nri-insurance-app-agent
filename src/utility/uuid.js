export default class uuid {
  static getUuid = () => {
    // const chars = "xxxxxxxxxxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
    const chars = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".split("");
    for (let i = 0, len = chars.length; i < len; i += 1) {
      switch (chars[i]) {
        case "x":
          chars[i] = Math.floor(Math.random() * 16).toString(16);
          break;
        case "y":
          chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
          break;
        default:
      }
    }
    return chars.join("");
  }
}
