import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClassModal from "@/components/modules/ClassModal";
import { getClasses } from "@/services/teacher";
import Link from "next/link";

export default async function DashboardPage() {
  const classesRes = await getClasses();
  const { classes } = await classesRes.json();

  return (
    <main className="min-h-screen px-8 py-12 bg-gray-50">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-primary">My Dashboard</h1>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Created Classes</h2>
        <ClassModal />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <Link key={cls.id} href={`/dashboard/classes/${cls._id}`}>
              <Card  className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle>{cls.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{cls.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* <section>
        <h2 className="text-2xl font-semibold mb-6">Joined Classes</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {joinedClasses.map((cls) => (
            <Card key={cls.id} className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>{cls.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{cls.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}
    </main>
  );
}
