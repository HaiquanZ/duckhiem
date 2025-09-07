import { Log } from "../models/log";
import { addData } from "./firestore";

export async function collectVisitorInfo(target: string) {
  try {
    // Thu thập thông tin client
    const info: Log = {
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      devicePixelRatio: window.devicePixelRatio,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      userAgent: navigator.userAgent,
      userAgentData: navigator.userAgent || '',
      currentTime: new Date().toString(),
      referrer: document.referrer || '',
      ip: '',
      target: target,
    };

    try {
      const ipRes = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipRes.json();
      info.ip = ipData.ip;
    } catch (e) {
      console.warn("Không lấy được IP public:", e);
    }

    const docId = await addData("logs", info);

    return docId;
  } catch (error) {
    console.error("Error collecting visitor info:", error);
    return null;
  }
}
