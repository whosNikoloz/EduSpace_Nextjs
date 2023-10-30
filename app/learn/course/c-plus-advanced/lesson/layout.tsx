export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col">
      <main className="h-screen">{children}</main>
    </div>
  );
}
