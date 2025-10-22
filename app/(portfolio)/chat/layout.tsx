import Script from "next/script";

function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
        strategy="afterInteractive"
      />
      <div>{children}</div>
    </>
  );
}

export default ChatLayout;
