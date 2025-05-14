import ClassModal from "@/components/modules/ClassModal";
import { getClasses } from "@/services/teacher";

import ClassCard from "@/components/cards/ClassCard";

const DashboardPage = async () => {
  const classesRes = await getClasses();
  const { classes } = await classesRes.json();

  return (
    <main className="min-h-screen px-8 py-12 ">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-primary">My Dashboard</h1>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Created Classes</h2>
        <ClassModal />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <ClassCard key={cls._id} cls={cls} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
