export class NavigatorUtils {
  public static isFirefox() {
    return navigator.userAgent.toLowerCase().includes('firefox');
  }
}
