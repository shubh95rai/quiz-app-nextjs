export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="p-3 rounded-lg bg-primary text-background space-y-1">
      <h3 className="uppercase font-semibold">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );
}
