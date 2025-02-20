export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-60px)] flex justify-center items-center px-4">
      {children}
    </div>
  );
}
