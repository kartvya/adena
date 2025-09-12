import React, { useEffect, useMemo, useRef, useState } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";

type Result =
  | { ok: true; type: "balance"; address: string; gnot: number; decoded: string; source: string }
  | { ok: false; type: "balance"; error: string; address?: string };

export interface GnoBalanceWebViewProps {
  // Set this to trigger a fetch. Whenever it changes to a valid g1 address, the WebView will fetch the balance.
  fetchAddress?: string;
  onResult: (result: Result) => void;
  // Optional: keep it hidden; we only need it mounted to run JS
  hidden?: boolean;
}

export default function GnoBalanceWebView({ fetchAddress, onResult, hidden }: GnoBalanceWebViewProps) {
  const webref = useRef<WebView>(null);
  const [ready, setReady] = useState(false);
  const lastSent = useRef<string>("");

  const html = useMemo(() => {
    // Minimal HTML + script that listens for messages and fetches the balance
    return `
<!doctype html>
<html>
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
  <body>
    <script>
      (function(){
        const RN = window.ReactNativeWebView;
        function post(msg){ try { RN.postMessage(JSON.stringify(msg)); } catch(e) {} }
        function b64(s){ try { return atob(s); } catch(e){ return ""; } }
        function parse(decoded){
          const m = (decoded || "").match(/(\\d+)\\s*([a-zA-Z0-9_]+)/);
          if(!m) return { micro: 0, denom: "ugnot", gnot: 0 };
          const micro = Number(m[1] || 0);
          const denom = String(m[2] || "ugnot").toLowerCase();
          const gnot = denom === "ugnot" ? micro / 1_000_000 : micro;
          return { micro, denom, gnot };
        }
        async function fetchWithTimeout(url, ms){
          const ctl = new AbortController();
          const t = setTimeout(() => ctl.abort(), ms);
          try {
            const res = await fetch(url, { signal: ctl.signal, headers: { "accept": "application/json" } });
            return await res.json();
          } finally { clearTimeout(t); }
        }
        async function getBalance(addr){
          const urls = [
            "https://cors.isomorphic-git.org/http://rpc.test3.gno.land:26657/abci_query?path=" + encodeURIComponent("/bank/balances/" + addr),
            "https://rpc.test3.gno.land/abci_query?path=" + encodeURIComponent("/bank/balances/" + addr)
          ];
          let lastErr = "All endpoints failed";
          for (const url of urls) {
            try {
              const data = await fetchWithTimeout(url, 9000);
              const code = data && data.result && data.result.response && data.result.response.code || 0;
              if (code && code !== 0) { lastErr = "ABCI error " + code + " " + (data?.result?.response?.log || ""); continue; }
              const v = data?.result?.response?.value || "";
              if (!v) return { ok: true, gnot: 0, decoded: "", source: url };
              const decoded = b64(v);
              const parsed = parse(decoded);
              return { ok: true, gnot: parsed.gnot, decoded, source: url };
            } catch (e) {
              lastErr = (e && e.message) || String(e);
            }
          }
          return { ok: false, error: lastErr };
        }
        window.addEventListener("message", async (ev) => {
          try {
            const msg = typeof ev.data === "string" ? JSON.parse(ev.data) : ev.data;
            if (msg && msg.type === "FETCH" && typeof msg.address === "string") {
              const addr = msg.address.trim();
              if (!addr.startsWith("g1") || addr.length < 12) return post({ ok: false, type: "balance", error: "Invalid G1 address" });
              const res = await getBalance(addr);
              post(Object.assign({ type: "balance", address: addr }, res));
            }
          } catch (e) {
            post({ ok: false, type: "balance", error: e?.message || "Script error" });
          }
        });
        // Signal ready to the native app
        post({ type: "ready" });
      })();
    </script>
  </body>
</html>
    `.trim();
  }, []);

  const onMessage = (ev: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(ev.nativeEvent.data);
      if (data?.type === "ready") {
        setReady(true);
        return;
      }
      if (data?.type === "balance") {
        onResult(data as Result);
      }
    } catch {
      // ignore malformed messages
    }
  };

  // When fetchAddress changes and webview is ready, ask it to fetch
  useEffect(() => {
    const addr = (fetchAddress || "").trim();
    if (!ready || !addr || addr === lastSent.current) return;
    try {
      webref.current?.postMessage(JSON.stringify({ type: "FETCH", address: addr }));
      lastSent.current = addr;
    } catch { /* no-op */ }
  }, [fetchAddress, ready]);

  return (
    <WebView
      ref={webref}
      originWhitelist={["*"]}
      source={{ html }}
      onMessage={onMessage}
      // Help Android allow http via the proxy path if needed
      mixedContentMode="always"
      javaScriptEnabled
      setSupportMultipleWindows={false}
      // Keep it hidden but mounted
      style={hidden ? { width: 1, height: 1, opacity: 0 } : { height: 120 }}
      // iOS note: ATS may still block direct http, but we use HTTPS proxy first
      allowsInlineMediaPlayback={false}
      incognito={true}
    />
  );
}