import { getSessionAction, getSessionUserAction } from "@/actions/actions";
import PageLayout from "@/components/PageLayout";
import SettingsForm from "@/components/SettingsForm";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getSessionAction();

  if (!session) {
    redirect("/");
  }

  const sessionUser = await getSessionUserAction();

  return (
    <PageLayout>
      <div className="text-center max-w-md w-full py-8 space-y-4">
        <h1 className="text-2xl font-bold tracking-tighter">Settings</h1>
        <div className="p-4 rounded-lg shadow bg-secondary border">
          <SettingsForm sessionUser={sessionUser} />
        </div>
      </div>
    </PageLayout>
  );
}
