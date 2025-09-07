import { Log } from "../models/log";
import { addData } from "./firestore";
import { v4 as uuidv4 } from "uuid";

function getOrCreateUserId(): string {
  const key = "userId";
  let userId = localStorage.getItem(key);

  if (!userId) {
    userId = uuidv4();
    localStorage.setItem(key, userId);
  }

  return userId;
}

export async function collectVisitorInfo(target: string) {
  try {
    const userId = getOrCreateUserId();
    // Thu thập thông tin client
    const info: Log = {
      userId: userId,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      devicePixelRatio: window.devicePixelRatio,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      userAgent: navigator.userAgent,
      userAgentData: navigator.userAgent || "",
      currentTime: new Date().toString(),
      referrer: document.referrer || "",
      ip: "",
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
