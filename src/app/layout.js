import "./globals.css";

export const metadata = {
  title: "PrepBuddy",
  description: "Your interview prep companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}